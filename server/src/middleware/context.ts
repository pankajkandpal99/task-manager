import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";

export class RequestContext {
  public params: Record<string, any>;
  public body: any;
  public user?: {
    id: string;
    email: string;
    role: string;
  };
  public transaction?: any;

  constructor(
    public prisma: PrismaClient,
    public req: Request,
    public res: Response
  ) {
    this.params = req.params;
    this.body = req.body;
    this.user = req.user as { id: string; email: string; role: string };
  }

  get db() {
    return this.transaction || this.prisma;
  }

  async withTransaction<T>(callback: () => Promise<T>): Promise<T> {
    const wasInTransaction = !!this.transaction;

    if (!wasInTransaction) {
      this.transaction = await this.prisma.$transaction({
        isolationLevel: "ReadCommitted",
      });
    }

    try {
      const result = await callback(); // Execute the callback with transaction context

      // Commit only if we started the transaction
      if (!wasInTransaction) {
        await this.transaction.$commit();
        this.transaction = undefined;
      }

      return result;
    } catch (error) {
      // Rollback only if we started the transaction
      if (!wasInTransaction && this.transaction) {
        await this.transaction.$rollback();
        this.transaction = undefined;
      }
      throw error;
    }
  }
}

export const contextMiddleware =
  (prisma: PrismaClient) =>
  (req: Request, res: Response, next: NextFunction) => {
    req.context = new RequestContext(prisma, req, res);
    next();
  };
