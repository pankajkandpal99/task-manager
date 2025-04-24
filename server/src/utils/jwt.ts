import jwt from "jsonwebtoken";
import config from "@config/env";
import { ITokenPayload } from "@interfaces/user.interface";

export const generateToken = (payload: ITokenPayload): string => {
  return jwt.sign(payload, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRES_IN,
  });
};

export const verifyToken = (token: string): ITokenPayload => {
  return jwt.verify(token, config.JWT_SECRET) as ITokenPayload;
};
