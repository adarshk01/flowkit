import express from "express";
import { PrismaClient } from "./generated/prisma/client";
const app = express();
const client = new PrismaClient();
app.use(express.json());
app.post("/hooks/catch/:userId/:zapId", async (req, res) => {
  const userId = req.params.userId;
  const zapId = req.params.zapId;
  const body = req.body;
  await client.$transaction(async (tx) => {
    const run = await client.zapRun.create({
      data: {
        zapId: zapId,
        metadata: body,
      },
    });
    await client.zapRunOutbox.create({
      data: {
        zapRunId: run.id,
      },
    });
  });
  res.json({
    message: "webhook received",
  });
});

app.get("/api/v1", (req, res) => {
  res.send("hello asdf");
});

app.listen(3000);
