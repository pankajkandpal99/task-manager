import { Request, Response, NextFunction } from "express";

import { verifyToken } from "@utils/jwt";
import ApiError from "@utils/apiError";
import { ITokenPayload } from "@interfaces/user.interface";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.token;

  if (!token) {
    return next(new ApiError(401, "Authentication required"));
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded as ITokenPayload;
    next();
  } catch (error) {
    return next(new ApiError(401, "Invalid or expired token"));
  }
};

export default authMiddleware;
