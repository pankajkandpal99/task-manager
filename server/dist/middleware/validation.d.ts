import { RequestHandler } from "express";
import { ZodSchema } from "zod";
type ValidationSchema = {
    body?: ZodSchema;
    query?: ZodSchema;
    params?: ZodSchema;
};
export declare const validateRequest: (schemas: ValidationSchema) => RequestHandler;
export {};
