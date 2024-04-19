import { PrismaClient } from "@prisma/client";

const globalPrismaClient = global as unknown as { prisma: PrismaClient };
export const prisma = globalPrismaClient.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalPrismaClient.prisma = prisma

export default prisma