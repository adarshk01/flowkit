import { Router } from "express";
import { authMiddleware } from "./middleware";
import { SigninData, SignupData } from "../types";
import { prismaClient } from "../db";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "../config";
const router = Router();

router.post("/signup", async (req, res) => {
  const body = req.body;

  const parsedData = SignupData.safeParse(body);
  if (!parsedData.success) {
    return res.status(411).json({
      message: "incorrect inputs",
    });
  }
  const userExists = await prismaClient.user.findFirst({
    where: {
      email: parsedData.data.username,
    },
  });
  if (userExists) {
    return res.status(403).json({
      message: "user already exist",
    });
  }

  await prismaClient.user.create({
    data: {
      name: parsedData.data.name,
      email: parsedData.data.username,
      password: parsedData.data.password,
    },
  });

  return res.json({
    message: "please verify your account",
  });
});

router.post("/signin", async (req, res) => {
  const body = req.body;
  const parsedData = SigninData.safeParse(body);

  if (!parsedData.success) {
    return res.status(411).json({
      message: "incorrect inputs",
    });
  }

  const user = await prismaClient.user.findFirst({
    where: {
      email: parsedData.data.username,
      password: parsedData.data.password,
    },
  });

  if (!user) {
    return res.status(403).json({
      message: "Invalid email or password",
    });
  }

  const token = jwt.sign(
    {
      id: user.id,
    },
    JWT_PASSWORD
  );
  res.json({
    token: token,
  });
});

router.get("/", authMiddleware, async (req, res) => {
  //@ts-ignore
  const id = req.id;
  const user = await prismaClient.user.findFirst({
    where: {
      id,
    },
    select: {
      name: true,
      email: true,
    },
  });
  return res.json({
    user,
  });
});

export const userRouter = router;
