import { hash } from "bcryptjs";
import { env } from "../../../config/env";
import { RequestContext } from "../../../middleware/context";
import jwt from "jsonwebtoken";
import { handleResult, tryCatch } from "../../../utils/result.utils";
import { Response } from "express";
import { User } from "../../../models/user.model";

class AuthError extends Error {
  constructor(
    message: string,
    public statusCode: number = 400
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}

const generateToken = (userId: string) =>
  jwt.sign({ userId }, env.JWT_SECRET, { expiresIn: "7d" });

const hashPassword = (password: string) => hash(password, 12);

export const AuthController = {
  register: async (context: RequestContext) => {
    const result = await tryCatch(async () => {
      return context.withTransaction(async (session) => {
        const { email, password, phoneNumber } = context.body;

        const existing = await User.findOne({ email }).session(session);
        if (existing) {
          throw new AuthError("User already exists", 409);
        }

        const hashedPassword = await hashPassword(password);
        const user = new User({
          email,
          password: hashedPassword,
          role: "USER",
          phoneNumber: phoneNumber,
        });

        await user.save({ session });
        const token = generateToken(user._id.toString());

        return {
          id: user._id.toString(),
          email: user.email,
          role: user.role,
          token,
        };
      });
    });

    // return handleResult(res)(result);
  },
};
