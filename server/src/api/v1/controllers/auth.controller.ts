import { RequestContext } from "../../../middleware/context";

const checkExistingUser = async (context: RequestContext, email: string) => {
    const existingUser = await context.db.
};

export const registerUser = async (context: RequestContext) => {};


// src/controllers/auth/register.controller.ts
// import { RequestContext } from "../../middleware/context";
// import { hash } from "bcryptjs";
// import { sign } from "jsonwebtoken";
// import { env } from "../../config/env";
// import { Result, tryCatch, pipe, tap } from "../../utils/result.utils";
// import { ConflictError } from "../../errors/appError";

// Helper functions (pure functions for better testability)
// const checkExistingUser = async (context: RequestContext, email: string) => {
//   const existingUser = await context.db.user.findUnique({ where: { email } });
//   if (existingUser) {
//     throw new ConflictError("Email already registered");
//   }
// };

// const hashUserPassword = async (password: string) => {
//   return hash(password, 12);
// };

// const createUserRecord = async (
//   context: RequestContext,
//   email: string,
//   hashedPassword: string
// ) => {
//   return context.db.user.create({
//     data: {
//       email,
//       password: hashedPassword,
//       role: "USER",
//     },
//   });
// };

// const generateAuthToken = (userId: string) => {
//   return sign({ userId }, env.JWT_SECRET, { expiresIn: "7d" });
// };

// // Main controller function
// export const registerUser = async (context: RequestContext) => {
//   return tryCatch(async () => {
//     const { email, password } = context.body;

//     // Functional pipeline for registration flow
//     return pipe(
//       // Step 1: Validate email uniqueness
//       async () => {
//         await checkExistingUser(context, email);
//         return { email, password };
//       },
      
//       // Step 2: Hash password
//       async ({ email, password }) => ({
//         email,
//         hashedPassword: await hashUserPassword(password),
//       }),
      
//       // Step 3: Create user record
//       async ({ email, hashedPassword }) => {
//         const user = await createUserRecord(context, email, hashedPassword);
//         return { user };
//       },
      
//       // Step 4: Generate token
//       async ({ user }) => {
//         const token = generateAuthToken(user.id);
//         return { user, token };
//       },
      
//       // Step 5: Format response
//       tap(({ user, token }) => ({
//         user: {
//           id: user.id,
//           email: user.email,
//           role: user.role,
//         },
//         token,
//       }))
//     )();
//   });
// };