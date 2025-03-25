import { createApp } from "./app";
import { env } from "./config/env";
import { mongooseConnection } from "./lib/db";
import { logger } from "./utils/logger";

const startServer = async () => {
  try {
    const app = createApp();
    await mongooseConnection.connect();

    const server = app.listen(env.PORT, () => {
      logger.info(`Server running in ${env.NODE_ENV} mode on port ${env.PORT}`);
    });

    process.on("SIGTERM", () => {
      logger.info("SIGTERM received: closing server");
      server.close(async () => {
        await mongooseConnection.disconnect;
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
