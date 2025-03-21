import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

export class RequestContext {
  constructor(
    public prisma: PrismaClient,
    public transaction?: any,
    public user?: {
      id: string;
      email: string;
      role: string;
    },
    public req?: Request,
    public res?: Response
  ) {}

  get db() {
    return this.transaction || this.prisma;
  }
}

export const contextMiddleware =
  (prisma: PrismaClient) =>
  (req: Request, res: Response, next: NextFunction) => {
    req.context = new RequestContext(prisma, undefined, undefined, req, res);
    next();
  };
