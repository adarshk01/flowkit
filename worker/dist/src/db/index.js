"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prismaClient = void 0;
// import { PrismaClient } from "../generated/prisma/client";
const client_1 = require("@prisma/client");
// export const prismaClient = new PrismaClient({
//   accelerateUrl: process.env.DATABASE_URL as string,
// });
require("dotenv").config();
const adapter_pg_1 = require("@prisma/adapter-pg");
console.log("DATABASE_URL =", process.env.DATABASE_URL);
const adapter = new adapter_pg_1.PrismaPg({
    connectionString: process.env.DATABASE_URL,
});
exports.prismaClient = new client_1.PrismaClient({ adapter });
// export const prismaClient = new PrismaClient();
