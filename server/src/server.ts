import { createApp } from "./app";
import { env } from "./config/env";
import { databaseConnection } from "./lib/db";
import { logger } from "./utils/logger";

const startServer = async () => {
  try {
    const app = await createApp();
    await databaseConnection.connect();

    const server = app.listen(env.PORT, () => {
      logger.info(`Server running in ${env.NODE_ENV} mode on port ${env.PORT}`);
    });

    process.on("SIGTERM", () => {
      logger.info("SIGTERM received: closing server");
      server.close(async () => {
        await databaseConnection.disconnect();
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

// If in the case ki agar mujhe existing images me hi ek aur image ya usse jyada image add karni hai to server ko full url me se kewal uploads wala url hi jaye client side se ye server se bhi handle hoga ki wo client se aane wale images me ye check kare ki usme koi string value to ni aa ri aur agr aa ri hai to wo uska poore path me se http://localhost:8800 hata dega ya jo bhi domain hoga use hata dega aur database me uploads wala path update kar dega jo tha pehle, aur client se backgroundImages me File bhi aa sakti hai kyuki existing images me nayi image add karne se wo use File type me bhejega aur server ko use purely validate karna padega... aur fir uska path bhi existing image ke saath database me save hoga... 