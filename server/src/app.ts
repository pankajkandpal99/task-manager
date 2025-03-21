import express from "express";
import helmet from "helmet";
import cors from "cors";
import { loadEnv } from "./config/env";
import { PrismaClient } from "@prisma/client";
import { contextMiddleware } from "./middleware/context";
import routes from "./routes";
import { errorHandler } from "./middleware/error-handler";

const env = loadEnv();
const prisma = new PrismaClient();

export const createApp = () => {
  const app = express();

  // Middlewares
  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(contextMiddleware(prisma));

  // Routes
  app.use("/api/v1", routes);

  // Error handling
  app.use(errorHandler);

  return app;
};
