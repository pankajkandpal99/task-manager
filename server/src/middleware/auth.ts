import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { loadEnv } from "../config/env";
import { ResponseService } from "../services/response.service";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const env = loadEnv();
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return ResponseService.error(res, "Unauthorized", 401);
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, env.JWT_SECRET, (err: any, decoded: any) => {
    if (err) return ResponseService.error(res, "Invalid token", 403);

    req.context.user = {
      id: decoded.sub,
      email: decoded.email,
      role: decoded.role,
    };

    next();
  });
};
