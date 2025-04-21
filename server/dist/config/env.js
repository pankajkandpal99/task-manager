"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const zod_1 = require("zod");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const envSchema = zod_1.z.object({
    NODE_ENV: zod_1.z
        .enum(["development", "production", "test"])
        .default("development"),
    PORT: zod_1.z.string().default("8800"),
    JWT_SECRET: zod_1.z.string(),
    DATABASE_URL: zod_1.z.string(),
    COOKIE_DOMAIN: zod_1.z.string(),
    ALLOWED_ORIGINS: zod_1.z.string(),
    BASE_URL: zod_1.z.string(),
});
exports.env = (() => {
    try {
        return envSchema.parse({
            NODE_ENV: process.env.NODE_ENV,
            PORT: process.env.PORT || "3000",
            JWT_SECRET: process.env.JWT_SECRET,
            DATABASE_URL: process.env.DATABASE_URL,
            COOKIE_DOMAIN: process.env.COOKIE_DOMAIN,
            ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS || "",
            BASE_URL: process.env.BASE_URL || "http://localhost:8800",
        });
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            console.error("Environment Variable Validation Failed:");
            error.errors.forEach((err) => {
                console.error(`- ${err.path.join(".")}: ${err.message}`);
            });
            throw new Error(`Invalid environment variables. Check your .env file.`);
        }
        throw error;
    }
})();
//# sourceMappingURL=env.js.map