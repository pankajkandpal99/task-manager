import { z } from "zod";
export declare const fileValidator: z.ZodObject<{
    fieldname: z.ZodString;
    filename: z.ZodString;
    encoding: z.ZodString;
    mimetype: z.ZodString;
    size: z.ZodNumber;
    destination: z.ZodString;
    path: z.ZodString;
    originalFilename: z.ZodOptional<z.ZodString>;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    fieldname: z.ZodString;
    filename: z.ZodString;
    encoding: z.ZodString;
    mimetype: z.ZodString;
    size: z.ZodNumber;
    destination: z.ZodString;
    path: z.ZodString;
    originalFilename: z.ZodOptional<z.ZodString>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    fieldname: z.ZodString;
    filename: z.ZodString;
    encoding: z.ZodString;
    mimetype: z.ZodString;
    size: z.ZodNumber;
    destination: z.ZodString;
    path: z.ZodString;
    originalFilename: z.ZodOptional<z.ZodString>;
}, z.ZodTypeAny, "passthrough">>;
