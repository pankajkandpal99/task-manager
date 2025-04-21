import { z } from "zod";
export declare const heroSectionSchema: z.ZodObject<{
    mainHeading: z.ZodString;
    subHeading: z.ZodString;
    buttonText: z.ZodString;
    backgroundImages: z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodObject<{
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
    }, z.ZodTypeAny, "passthrough">>, z.ZodString]>, "many">>;
    existingImages: z.ZodDefault<z.ZodOptional<z.ZodUnion<[z.ZodEffects<z.ZodString, string[], string>, z.ZodArray<z.ZodString, "many">]>>>;
    scrollingTexts: z.ZodArray<z.ZodString, "many">;
    transitionDuration: z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number, string>]>, number, string | number>;
    active: z.ZodUnion<[z.ZodBoolean, z.ZodEffects<z.ZodEnum<["true", "false"]>, boolean, "true" | "false">]>;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    mainHeading: z.ZodString;
    subHeading: z.ZodString;
    buttonText: z.ZodString;
    backgroundImages: z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodObject<{
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
    }, z.ZodTypeAny, "passthrough">>, z.ZodString]>, "many">>;
    existingImages: z.ZodDefault<z.ZodOptional<z.ZodUnion<[z.ZodEffects<z.ZodString, string[], string>, z.ZodArray<z.ZodString, "many">]>>>;
    scrollingTexts: z.ZodArray<z.ZodString, "many">;
    transitionDuration: z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number, string>]>, number, string | number>;
    active: z.ZodUnion<[z.ZodBoolean, z.ZodEffects<z.ZodEnum<["true", "false"]>, boolean, "true" | "false">]>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    mainHeading: z.ZodString;
    subHeading: z.ZodString;
    buttonText: z.ZodString;
    backgroundImages: z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodObject<{
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
    }, z.ZodTypeAny, "passthrough">>, z.ZodString]>, "many">>;
    existingImages: z.ZodDefault<z.ZodOptional<z.ZodUnion<[z.ZodEffects<z.ZodString, string[], string>, z.ZodArray<z.ZodString, "many">]>>>;
    scrollingTexts: z.ZodArray<z.ZodString, "many">;
    transitionDuration: z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodString, number, string>]>, number, string | number>;
    active: z.ZodUnion<[z.ZodBoolean, z.ZodEffects<z.ZodEnum<["true", "false"]>, boolean, "true" | "false">]>;
}, z.ZodTypeAny, "passthrough">>;
