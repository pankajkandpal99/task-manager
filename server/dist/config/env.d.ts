import { z } from "zod";
declare const envSchema: z.ZodObject<{
    NODE_ENV: z.ZodDefault<z.ZodEnum<["development", "production", "test"]>>;
    PORT: z.ZodDefault<z.ZodString>;
    JWT_SECRET: z.ZodString;
    DATABASE_URL: z.ZodString;
    COOKIE_DOMAIN: z.ZodString;
    ALLOWED_ORIGINS: z.ZodString;
    BASE_URL: z.ZodString;
}, "strip", z.ZodTypeAny, {
    NODE_ENV: "development" | "production" | "test";
    PORT: string;
    JWT_SECRET: string;
    DATABASE_URL: string;
    COOKIE_DOMAIN: string;
    ALLOWED_ORIGINS: string;
    BASE_URL: string;
}, {
    JWT_SECRET: string;
    DATABASE_URL: string;
    COOKIE_DOMAIN: string;
    ALLOWED_ORIGINS: string;
    BASE_URL: string;
    NODE_ENV?: "development" | "production" | "test" | undefined;
    PORT?: string | undefined;
}>;
export type Env = z.infer<typeof envSchema>;
export declare const env: Env;
export {};
