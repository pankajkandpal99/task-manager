import { logger } from "../utils/logger";
import prisma from "./prisma";

export const connectDB = async () => {
  try {
    await prisma.$connect();
    logger.info("Database connected successfully");
  } catch (error) {
    logger.error("Database connection error:", error);
    process.exit(1); // Exit the process if the connection fails
  }
};

export const disconnectDB = async () => {
  try {
    await prisma.$disconnect();
    logger.info("Database disconnected successfully");
  } catch (error) {
    logger.error("Database disconnection error:", error);
    process.exit(1); // Exit the process if the disconnection fails
  }
};
