"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.heroSectionSchema = void 0;
const zod_1 = require("zod");
const file_validator_1 = require("../../lib/file-validator");
exports.heroSectionSchema = zod_1.z
    .object({
    mainHeading: zod_1.z
        .string()
        .min(5, "Main heading must be at least 5 characters")
        .max(100, "Main heading cannot exceed 100 characters"),
    subHeading: zod_1.z
        .string()
        .min(10, "Sub heading must be at least 10 characters")
        .max(200, "Sub heading cannot exceed 200 characters"),
    buttonText: zod_1.z
        .string()
        .min(2, "Button text must be at least 2 characters")
        .max(50, "Button text cannot exceed 50 characters"),
    backgroundImages: zod_1.z.array(zod_1.z.union([file_validator_1.fileValidator, zod_1.z.string()])).optional(),
    existingImages: zod_1.z
        .union([zod_1.z.string().transform((val) => [val]), zod_1.z.array(zod_1.z.string())])
        .optional()
        .default([]),
    scrollingTexts: zod_1.z
        .array(zod_1.z
        .string()
        .min(10, "Scrolling text must be at least 10 characters")
        .max(150, "Scrolling text cannot exceed 150 characters"))
        .min(1, "At least one scrolling text is required"),
    transitionDuration: zod_1.z
        .union([
        zod_1.z.number(),
        zod_1.z
            .string()
            .regex(/^\d+$/)
            .transform((val) => parseInt(val, 10)),
    ])
        .refine((val) => val >= 1000 && val <= 10000, {
        message: "Transition duration must be between 1000ms and 10000ms",
    }),
    active: zod_1.z.union([
        zod_1.z.boolean(),
        zod_1.z.enum(["true", "false"]).transform((val) => val === "true"),
    ]),
})
    .strict()
    .passthrough();
//# sourceMappingURL=heroSectionSchema.js.map