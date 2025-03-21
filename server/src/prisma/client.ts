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

export const connectDB = async () => {
  try {
    await prisma.$connect();
    logger.info("Database connected successfully");
  } catch (error) {
    logger.error("Database connection error:", error);
    process.exit(1);
  }
};

export default prisma;
