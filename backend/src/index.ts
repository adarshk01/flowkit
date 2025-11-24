import express from "express";
import { userRouter } from "./router/user";
import { zapRouter } from "./router/zap";
import cors from "cors";
require("dotenv").config();
// import dotenv from "dotenv";
// dotenv.config();
const app = express();
console.log("DATABASE_URL:", process.env.DATABASE_URL);
app.use(express.json());
app.use(cors());
app.use("/api/v1/user", userRouter);

app.use("/api/v1/zap", zapRouter);

app.listen(3000);
