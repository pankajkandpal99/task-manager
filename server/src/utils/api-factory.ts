import { RequestHandler } from "express";
import { RequestContext } from "../middleware/context";
import { ParsedQs } from "qs";
import { ZodSchema } from "zod";
import { AuditHooks } from "../hooks/audit";
import { requireAuth } from "../middleware/auth";
import { HttpResponse } from "../utils/service-response";
import { TransactionHooks } from "../hooks/transactions";

type ApiHandlerOptions = {
  bodySchema?: ZodSchema;
  querySchema?: ZodSchema;
  requireAuth?: boolean;
  useTransaction?: boolean;
  auditLog?: boolean;
};

export function createApiHandler(
  handler: (context: RequestContext) => Promise<any>,
  options: ApiHandlerOptions = {}
): RequestHandler[] {
  const middlewares: RequestHandler[] = [];

  // Authentication
  if (options.requireAuth !== false) {
    middlewares.push(requireAuth);
  }

  // Validation
  if (options.bodySchema || options.querySchema) {
    middlewares.push(async (req, res, next) => {
      try {
        if (options.bodySchema) {
          req.body = await options.bodySchema.parseAsync(req.body);
        }
        if (options.querySchema) {
          req.query = (await options.querySchema.parseAsync(
            req.query
          )) as ParsedQs;
        }
        next();
      } catch (error) {
        HttpResponse.error(res, "Validation failed", 400, error as any);
      }
    });
  }

  middlewares.push(async (req, res) => {
    const context = req.context as RequestContext;
    let transactionStarted = false;

    try {
      // Start transaction if needed
      if (options.useTransaction) {
        await TransactionHooks.startTransaction(context);
        transactionStarted = true;
      }

      // Execute the handler with transaction-aware context
      const result = await handler(context);

      // Commit transaction if we started one
      if (transactionStarted) {
        await TransactionHooks.commitTransaction(context);
      }

      // Audit logging (if not explicitly disabled)
      if (options.auditLog !== false) {
        await AuditHooks.logOperation(context);
      }

      // Send successful response
      HttpResponse.send(res, result);
    } catch (error) {
      if (transactionStarted) {
        await TransactionHooks.rollbackTransaction(context);
      }

      // Log the error
      await AuditHooks.logError(context, error as any);

      HttpResponse.handleResult(res, error);
    }
  });

  return middlewares;
}
