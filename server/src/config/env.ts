import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]),
  PORT: z.string().default("8800"),
  JWT_SECRET: z.string(),
  DATABASE_URL: z.string(),
});

export type Env = z.infer<typeof envSchema>;

export const loadEnv = (): Env => {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    throw new Error(`Invalid environment variables: ${error}`);
  }
};
