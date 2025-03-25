import express from "express";
import helmet from "helmet";
import cors from "cors";
import { contextMiddleware } from "./middleware/context";
import { errorHandler } from "./middleware/error-handler";
import baseRouter from "./api/v1/routes";

export const createApp = async () => {
  const app = express();
  const db = await;

  // Middlewares
  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(contextMiddleware(db));

  // Routes
  app.use("/api/v1", baseRouter);

  // Error Handling
  app.use(errorHandler);

  return app;
};
