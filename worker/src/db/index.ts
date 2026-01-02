// import { PrismaClient } from "../generated/prisma/client";
import { PrismaClient } from "@prisma/client";
// export const prismaClient = new PrismaClient({
//   accelerateUrl: process.env.DATABASE_URL as string,
// });
require("dotenv").config();
import { PrismaPg } from "@prisma/adapter-pg";

console.log("DATABASE_URL =", process.env.DATABASE_URL);

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
export const prismaClient = new PrismaClient({ adapter });
// export const prismaClient = new PrismaClient();
