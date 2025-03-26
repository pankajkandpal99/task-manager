import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import { contextMiddleware } from "./middleware/context";
import baseRouter from "./api/v1/routes";
import { databaseConnection } from "./lib/db";
import { errorHandler } from "./error-handler/error-handler";
import { corsOptions } from "./config/corsOptions";

export const createApp = async () => {
  const app = express();
  const db = databaseConnection.getConnection();

  // Middlewares
  app.use(helmet());
  app.use(cors(corsOptions));
  app.use(cookieParser());
  app.use(express.json());
  app.use(contextMiddleware(db));

  // Routes
  app.use("/api/v1", baseRouter);

  // Add this at the end of your createApp function
  app.use(errorHandler as unknown as express.ErrorRequestHandler);
  return app;
};
