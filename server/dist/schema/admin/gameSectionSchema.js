"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gameUpdateSchema = exports.gameSchema = void 0;
const zod_1 = require("zod");
const file_validator_1 = require("../../lib/file-validator");
const baseGameSchema = zod_1.z
    .object({
    id: zod_1.z.string().optional(),
    title: zod_1.z.string().min(3, "Title must be at least 3 characters"),
    description: zod_1.z.string().optional().default(""),
    thumbnail: zod_1.z.union([file_validator_1.fileValidator, zod_1.z.string()]),
    category: zod_1.z.string().min(1, "Category is required"),
    gameUrl: zod_1.z.string().url("Must be a valid game URL"),
    isFeatured: zod_1.z
        .union([
        zod_1.z.boolean(),
        zod_1.z.enum(["true", "false"]).transform((val) => val === "true"),
    ])
        .default(false),
    isNew: zod_1.z
        .union([
        zod_1.z.boolean(),
        zod_1.z.enum(["true", "false"]).transform((val) => val === "true"),
    ])
        .default(true),
    minPlayers: zod_1.z
        .union([
        zod_1.z.number().int().min(1),
        zod_1.z.string().regex(/^\d+$/).transform(Number),
    ])
        .default(1),
    maxPlayers: zod_1.z
        .union([
        zod_1.z.number().int().min(1),
        zod_1.z.string().regex(/^\d+$/).transform(Number),
    ])
        .default(100),
    players: zod_1.z.number().int().min(0).default(0).optional(),
    uploadPath: zod_1.z.string().optional(),
    createdAt: zod_1.z.date().optional(),
    updatedAt: zod_1.z.date().optional(),
})
    .strict();
exports.gameSchema = baseGameSchema.refine((data) => data.maxPlayers >= data.minPlayers, {
    message: "Max players must be greater than or equal to min players",
    path: ["maxPlayers"],
});
exports.gameUpdateSchema = baseGameSchema
    .partial()
    .strict()
    .refine((data) => {
    if (data.minPlayers !== undefined && data.maxPlayers !== undefined) {
        return data.maxPlayers >= data.minPlayers;
    }
    return true;
}, {
    message: "Max players must be greater than or equal to min players",
    path: ["maxPlayers"],
});
//# sourceMappingURL=gameSectionSchema.js.map