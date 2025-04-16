import { z } from "zod";
import { fileValidator } from "../../lib/file-validator";

export const gameSchema = z
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
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  })
  .strict()
  .refine((data) => data.maxPlayers >= data.minPlayers, {
    message: "Max players must be greater than or equal to min players",
    path: ["maxPlayers"],
  });

export type GameSchemaType = z.infer<typeof gameSchema>;
