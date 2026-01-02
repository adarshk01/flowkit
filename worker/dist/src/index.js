"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const kafkajs_1 = require("kafkajs");
const parser_1 = require("./parser");
const email_1 = require("./email");
const db_1 = require("./db");
// const prismaClient = new PrismaClient();
const TOPIC_NAME = "zap-events";
const kafka = new kafkajs_1.Kafka({
    clientId: "outbox-processor-2",
    brokers: ["localhost:9092"],
});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const consumer = kafka.consumer({
            groupId: "main-worker-2",
        });
        yield consumer.connect();
        const producer = kafka.producer();
        yield producer.connect();
        yield consumer.subscribe({
            topic: TOPIC_NAME,
            fromBeginning: false,
        });
        yield consumer.run({
            autoCommit: false,
            eachMessage: (_a) => __awaiter(this, [_a], void 0, function* ({ topic, partition, message }) {
                var _b, _c, _d, _e, _f, _g, _h;
                console.log({
                    partition,
                    offset: message.offset.toString(),
                    value: (_b = message.value) === null || _b === void 0 ? void 0 : _b.toString(),
                });
                if (!((_c = message.value) === null || _c === void 0 ? void 0 : _c.toString())) {
                    return;
                }
                // // const parsedValue = JSON.parse(message.value?.toString());
                // const parsedValues = message.value?.toString();
                // // const zapRunId = parsedValue.zapRunId;
                // // const stage = parsedValue.stage;
                // let zapRunId: string;
                // let stage: number;
                // try {
                //   const parsedValue = JSON.parse(parsedValues);
                //   zapRunId = parsedValue.zapRunId;
                //   stage = parsedValue.stage;
                // } catch (error) {
                //   // First message is just the zapRunId string
                //   zapRunId = parsedValues;
                //   stage = 0; // Start from stage 0
                //   console.log("Received initial trigger with zapRunId:", zapRunId);
                // }
                const parsedValue = JSON.parse((_d = message.value) === null || _d === void 0 ? void 0 : _d.toString());
                const zapRunId = parsedValue.zapRunId;
                const stage = parsedValue.stage;
                const zapRunDetails = yield db_1.prismaClient.zapRun.findFirst({
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
                const currentAction = zapRunDetails === null || zapRunDetails === void 0 ? void 0 : zapRunDetails.zap.actions.find((x) => x.sortingOrder === stage);
                console.log("=== DEBUG INFO ===");
                console.log("ZapRunId:", zapRunId);
                console.log("Stage:", stage);
                console.log("Metadata:", JSON.stringify(zapRunDetails === null || zapRunDetails === void 0 ? void 0 : zapRunDetails.metadata));
                console.log("Current Action:", JSON.stringify(currentAction === null || currentAction === void 0 ? void 0 : currentAction.metadata));
                console.log("==================");
                if (!currentAction) {
                    console.log("!!!!current action not found!!!!");
                    return;
                }
                const zapRunMetadata = zapRunDetails === null || zapRunDetails === void 0 ? void 0 : zapRunDetails.metadata;
                if (currentAction.type.id === "email") {
                    // console.log("send an email");
                    const body = (0, parser_1.parse)((_e = currentAction.metadata) === null || _e === void 0 ? void 0 : _e.body, zapRunMetadata);
                    const to = (0, parser_1.parse)((_f = currentAction.metadata) === null || _f === void 0 ? void 0 : _f.email, zapRunMetadata);
                    console.log(`Sending out email to ${to} body is ${body}`);
                    yield (0, email_1.sendEmail)(to, body);
                }
                // if (currentAction.type.id === "sol") {
                //   const amount = parse(
                //     (currentAction.metadata as JsonObject)?.amount as string,
                //     zapRunMetadata
                //   );
                //   const publicId = parse(
                //     (currentAction.metadata as JsonObject)?.publicId as string,
                //     zapRunMetadata
                //   );
                // }
                yield new Promise((r) => setTimeout(r, 500));
                const zapId = (_g = message.value) === null || _g === void 0 ? void 0 : _g.toString();
                const lastStage = (((_h = zapRunDetails === null || zapRunDetails === void 0 ? void 0 : zapRunDetails.zap.actions) === null || _h === void 0 ? void 0 : _h.length) || 1) - 1;
                if (lastStage !== stage) {
                    yield producer.send({
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
                yield consumer.commitOffsets([
                    {
                        topic: TOPIC_NAME,
                        partition: partition,
                        offset: (parseInt(message.offset) + 1).toString(),
                    },
                ]);
            }),
        });
    });
}
main();
