import { prismaClient } from "./db";
console.log("FILE IS LOADING");
import { Kafka } from "kafkajs";
import { PrismaClient } from "@prisma/client";
const TOPIC_NAME = "zap-events";
// const client = new PrismaClient();

const kafka = new Kafka({
  clientId: "outbox-processor",
  brokers: ["localhost:9092"],
});

async function main() {
  console.log("control over here");
  const producer = kafka.producer();
  await producer.connect();

  while (1) {
    const pendingRows = await prismaClient.zapRunOutbox.findMany({
      where: {},
      take: 10,
    });
    console.log(pendingRows);
    producer.send({
      topic: TOPIC_NAME,
      messages: pendingRows.map((r: any) => {
        return {
          value: JSON.stringify({ zapRunId: r.zapRunId, stage: 0 }),
        };
      }),
    });

    await prismaClient.zapRunOutbox.deleteMany({
      where: {
        id: {
          in: pendingRows.map((x: any) => x.id),
        },
      },
    });
    await new Promise((r) => setTimeout(r, 3000));
  }
}

console.log("ABOUT TO CALL MAIN");
main().catch(console.error);
console.log("MAIN CALLED");

//docker-kafka command: docker run -p 9092:9092 apache/kafka:4.1.1
