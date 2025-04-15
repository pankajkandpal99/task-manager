import { z } from "zod";

const fileValidator = z
  .object({
    fieldname: z.string(),
    filename: z.string(),
    encoding: z.string(),
    mimetype: z.string(),
    size: z.number(),
    destination: z.string(),
    path: z.string(),
    originalFilename: z.string().optional(),
  })
  .passthrough();

export const heroSectionSchema = z
  .object({
    mainHeading: z
      .string()
      .min(5, "Main heading must be at least 5 characters")
      .max(100, "Main heading cannot exceed 100 characters"),
    subHeading: z
      .string()
      .min(10, "Sub heading must be at least 10 characters")
      .max(200, "Sub heading cannot exceed 200 characters"),
    buttonText: z
      .string()
      .min(2, "Button text must be at least 2 characters")
      .max(50, "Button text cannot exceed 50 characters"),
    backgroundImages: z.array(z.union([fileValidator, z.string()])).optional(),
    existingImages: z
      .union([z.string().transform((val) => [val]), z.array(z.string())])
      .optional()
      .default([]),
    scrollingTexts: z
      .array(
        z
          .string()
          .min(10, "Scrolling text must be at least 10 characters")
          .max(150, "Scrolling text cannot exceed 150 characters")
      )
      .min(1, "At least one scrolling text is required"),
    transitionDuration: z
      .union([
        z.number(),
        z
          .string()
          .regex(/^\d+$/)
          .transform((val) => parseInt(val, 10)),
      ])
      .refine((val) => val >= 1000 && val <= 10000, {
        message: "Transition duration must be between 1000ms and 10000ms",
      }),
    active: z.union([
      z.boolean(),
      z.enum(["true", "false"]).transform((val) => val === "true"),
    ]),
  })
  .strict()
  .passthrough(); // Allow extra fields for flexibility with files
