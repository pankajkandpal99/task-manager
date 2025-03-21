import { Request, Response, NextFunction } from "express";
import { TransactionHooks } from "../hooks/preHooks";
import { ResponseService } from "../services/response.service";

export const transactionMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const context = req.context;

  try {
    // Start transaction
    await TransactionHooks.startTransaction(context);

    // Execute next middleware/handler
    await next();

    // Commit transaction
    await TransactionHooks.commitTransaction(context);
  } catch (error) {
    // Rollback transaction on error
    await TransactionHooks.rollbackTransaction(context);
    ResponseService.error(res, "Transaction failed", 500, error as any);
  }
};
