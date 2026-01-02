require("dotenv").config();

import { Kafka } from "kafkajs";
import { PrismaClient } from "@prisma/client";
import { JsonObject } from "@prisma/client/runtime/client";
import { parse } from "./parser";
import { sendEmail } from "./email";
import { prismaClient } from "./db";
// const prismaClient = new PrismaClient();

const TOPIC_NAME = "zap-events";

const kafka = new Kafka({
  clientId: "outbox-processor-2",
  brokers: ["localhost:9092"],
});
async function main() {
  const consumer = kafka.consumer({
    groupId: "main-worker-2",
  });
  await consumer.connect();
  const producer = kafka.producer();
  await producer.connect();
  await consumer.subscribe({
    topic: TOPIC_NAME,
    fromBeginning: false,
  });
  await consumer.run({
    autoCommit: false,
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset.toString(),
        value: message.value?.toString(),
      });

      if (!message.value?.toString()) {
        return;
      }

      const parsedValue = JSON.parse(message.value?.toString());
      const zapRunId = parsedValue.zapRunId;
      const stage = parsedValue.stage;

      const zapRunDetails = await prismaClient.zapRun.findFirst({
        where: {
          id: zapRunId,
        },
        include: {
          zap: {
            include: {
              actions: {
                include: {
                  type: true,
                },
              },
            },
          },
        },
      });

      const currentAction = zapRunDetails?.zap.actions.find(
        (x) => x.sortingOrder === stage
      );

      console.log("=== DEBUG INFO ===");
      console.log("ZapRunId:", zapRunId);
      console.log("Stage:", stage);
      console.log("Metadata:", JSON.stringify(zapRunDetails?.metadata));
      console.log("Current Action:", JSON.stringify(currentAction?.metadata));
      console.log("==================");

      if (!currentAction) {
        console.log("!!!!current action not found!!!!");
        return;
      }
      const zapRunMetadata = zapRunDetails?.metadata;
      if (currentAction.type.id === "email") {
        // console.log("send an email");

        const body = parse(
          (currentAction.metadata as JsonObject)?.body as string,
          zapRunMetadata
        );
        const to = parse(
          (currentAction.metadata as JsonObject)?.email as string,
          zapRunMetadata
        );
        console.log(`Sending out email to ${to} body is ${body}`);
        await sendEmail(to, body);
      }

      if (currentAction.type.id === "sol") {
        const amount = parse(
          (currentAction.metadata as JsonObject)?.amount as string,
          zapRunMetadata
        );
        const publicId = parse(
          (currentAction.metadata as JsonObject)?.publicId as string,
          zapRunMetadata
        );
      }

      await new Promise((r) => setTimeout(r, 500));

      const zapId = message.value?.toString();

      const lastStage = (zapRunDetails?.zap.actions?.length || 1) - 1;

      if (lastStage !== stage) {
        await producer.send({
          topic: TOPIC_NAME,
          messages: [
            {
              value: JSON.stringify({
                stage: stage + 1,
                zapRunId,
              }),
            },
          ],
        });
      }
      console.log("processing done");
      await consumer.commitOffsets([
        {
          topic: TOPIC_NAME,
          partition: partition,
          offset: (parseInt(message.offset) + 1).toString(),
        },
      ]);
    },
  });
}
main();
