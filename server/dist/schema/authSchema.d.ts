import { z } from "zod";
export declare const registerSchema: z.ZodEffects<z.ZodObject<{
    username: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    password: z.ZodString;
    confirmPassword: z.ZodString;
    phoneNumber: z.ZodString;
}, "strict", z.ZodTypeAny, {
    password: string;
    phoneNumber: string;
    confirmPassword: string;
    email?: string | undefined;
    username?: string | undefined;
}, {
    password: string;
    phoneNumber: string;
    confirmPassword: string;
    email?: string | undefined;
    username?: string | undefined;
}>, {
    password: string;
    phoneNumber: string;
    confirmPassword: string;
    email?: string | undefined;
    username?: string | undefined;
}, {
    password: string;
    phoneNumber: string;
    confirmPassword: string;
    email?: string | undefined;
    username?: string | undefined;
}>;
export declare const loginSchema: z.ZodEffects<z.ZodObject<{
    email: z.ZodOptional<z.ZodString>;
    phoneNumber: z.ZodOptional<z.ZodString>;
    password: z.ZodString;
}, "strict", z.ZodTypeAny, {
    password: string;
    email?: string | undefined;
    phoneNumber?: string | undefined;
}, {
    password: string;
    email?: string | undefined;
    phoneNumber?: string | undefined;
}>, {
    password: string;
    email?: string | undefined;
    phoneNumber?: string | undefined;
}, {
    password: string;
    email?: string | undefined;
    phoneNumber?: string | undefined;
}>;
