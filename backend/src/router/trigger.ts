import { Router } from "express";
import { authMiddleware } from "./middleware";
import { SigninData, SignupData } from "../types";
import { prismaClient } from "../db";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "../config";
const router = Router();

router.get("/available", async (req, res) => {
  const availbleTrigger = await prismaClient.availableTriggers.findMany({});
  res.json({
    availbleTrigger,
  });
});

export const triggerRouter = router;
