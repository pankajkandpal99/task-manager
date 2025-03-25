import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { StatusCodes } from "../config/constants";
import { logger } from "../utils/logger";
import { ApiResponseService } from "../services/response.service";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(`[${req.method}] ${req.path} >> ${err.stack}`);

  // Handle Zod validation errors
  if (err instanceof ZodError) {
    return ApiResponseService.error(
      res,
      "Validation Error",
      StatusCodes.BAD_REQUEST,
      err.errors
    );
  }

  // Handle JWT errors
  if (err.name === "JsonWebTokenError") {
    return ApiResponseService.error(
      res,
      "Invalid Token",
      StatusCodes.UNAUTHORIZED
    );
  }

  // Handle generic errors
  ApiResponseService.error(
    res,
    process.env.NODE_ENV === "production"
      ? "Internal Server Error"
      : err.message,
    StatusCodes.INTERNAL_SERVER_ERROR
  );
};
