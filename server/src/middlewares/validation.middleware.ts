import { RequestHandler } from "express";
import { z } from "zod";
import ApiError from "@utils/apiError";

export const validate = <T extends z.ZodTypeAny>(schema: T): RequestHandler => {
  return (req, res, next) => {
    try {
      const result = schema.safeParse(req.body);

      if (!result.success) {
        const errors = result.error.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));
        return next(new ApiError(400, "Validation failed", errors));
      }

      // Attach validated data to request object with proper typing
      req.body = result.data;
      next();
    } catch (error) {
      next(error);
    }
  };
};
