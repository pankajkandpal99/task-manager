import { Request, Response, NextFunction } from "express";
import { ResponseService } from "../services/response.service";
import { ZodError } from "zod";
import { StatusCodes } from "../config/constants";
import { logger } from "../utils/logger";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(`[${req.method}] ${req.path} >> ${err.stack}`);

  // Handle Zod validation errors
  if (err instanceof ZodError) {
    return ResponseService.error(
      res,
      "Validation Error",
      StatusCodes.BAD_REQUEST,
      err.errors
    );
  }

  // Handle JWT errors
  if (err.name === "JsonWebTokenError") {
    return ResponseService.error(
      res,
      "Invalid Token",
      StatusCodes.UNAUTHORIZED
    );
  }

  // Handle generic errors
  ResponseService.error(
    res,
    process.env.NODE_ENV === "production"
      ? "Internal Server Error"
      : err.message,
    StatusCodes.INTERNAL_SERVER_ERROR
  );
};
