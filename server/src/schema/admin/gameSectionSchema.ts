import { z } from "zod";
import { fileValidator } from "../../lib/file-validator";

const baseGameSchema = z
  .object({
    id: z.string().optional(),
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z.string().optional().default(""),
    thumbnail: z.union([fileValidator, z.string()]),
    category: z.string().min(1, "Category is required"),
    gameUrl: z.string().url("Must be a valid game URL"),
    isFeatured: z
      .union([
        z.boolean(),
        z.enum(["true", "false"]).transform((val) => val === "true"),
      ])
      .default(false),
    isNew: z
      .union([
        z.boolean(),
        z.enum(["true", "false"]).transform((val) => val === "true"),
      ])
      .default(true),
    minPlayers: z
      .union([
        z.number().int().min(1),
        z.string().regex(/^\d+$/).transform(Number),
      ])
      .default(1),
    maxPlayers: z
      .union([
        z.number().int().min(1),
        z.string().regex(/^\d+$/).transform(Number),
      ])
      .default(100),
    players: z.number().int().min(0).default(0).optional(),
    uploadPath: z.string().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  })
  .strict();

// Add refinement for the full schema
export const gameSchema = baseGameSchema.refine(
  (data) => data.maxPlayers >= data.minPlayers,
  {
    message: "Max players must be greater than or equal to min players",
    path: ["maxPlayers"],
  }
);

// Create partial schema first, then add refinement
export const gameUpdateSchema = baseGameSchema
  .partial()
  .strict()
  .refine(
    (data) => {
      // Only apply refinement if both fields are present
      if (data.minPlayers !== undefined && data.maxPlayers !== undefined) {
        return data.maxPlayers >= data.minPlayers;
      }
      return true;
    },
    {
      message: "Max players must be greater than or equal to min players",
      path: ["maxPlayers"],
    }
  );

export type GameSchemaType = z.infer<typeof gameSchema>;
