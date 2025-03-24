import { PrismaClient } from "@prisma/client";
import { logger } from "../utils/logger";

const prisma = new PrismaClient({
  log: [
    { level: "warn", emit: "event" },
    { level: "info", emit: "event" },
    { level: "error", emit: "event" },
  ],
});

prisma.$on("warn", (e: { message: string }) => logger.warn(e.message));
prisma.$on("info", (e: { message: string }) => logger.info(e.message));
prisma.$on("error", (e: { message: string }) => logger.error(e.message));

export default prisma;
