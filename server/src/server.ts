import { createApp } from "./app";
import { loadEnv } from "./config/env";
import { connectDB, disconnectDB } from "./lib/db";
import { logger } from "./utils/logger";

const startServer = async () => {
  try {
    const env = loadEnv();
    const app = createApp();

    await connectDB();

    const server = app.listen(env.PORT, () => {
      logger.info(`Server running in ${env.NODE_ENV} mode on port ${env.PORT}`);
    });

    process.on("SIGTERM", () => {
      logger.info("SIGTERM received: closing server");
      server.close(async () => {
        await disconnectDB();
        logger.info("Server closed");
        process.exit(0);
      });
    });
  } catch (error) {
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
