import { RequestHandler } from "express";
import { ParsedQs } from "qs";
import { RequestContext } from "../middleware/context";
import { z, ZodSchema } from "zod";
import { TransactionHooks } from "../hooks/preHooks";
import { AuditHooks } from "../hooks/postHooks";
import { requireAuth } from "../middleware/auth";
import { transactionMiddleware } from "./transactions";
import { HttpResponse } from "./service-response";

type ApiHandlerOptions<TBody = any, TQuery = any> = {
  bodySchema?: ZodSchema<TBody>;
  querySchema?: ZodSchema<TQuery>;
  requireAuth?: boolean;
  useTransaction?: boolean;
  preHooks?: Array<(context: RequestContext) => Promise<void>>;
  postHooks?: Array<(context: RequestContext) => Promise<void>>;
};

export function createApiHandler<TBody, TQuery>(
  handler: (context: RequestContext) => Promise<any>,
  options: ApiHandlerOptions<TBody, TQuery> = {}
): RequestHandler[] {
  const middlewares: RequestHandler[] = [];

  // Authentication
  if (options.requireAuth) {
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
        if (error instanceof z.ZodError) {
          HttpResponse.error(res, "Validation failed", 400, error.errors);
        } else {
          HttpResponse.error(res, "Validation failed", 400);
        }
      }
    });
  }

  // Transaction middleware
  if (options.useTransaction) {
    middlewares.push(transactionMiddleware);
  }

  // Main handler
  middlewares.push(async (req, res) => {
    try {
      const context = req.context;

      // Default pre-hooks
      const preHooks = [
        ...(options.preHooks || []),
        ...(options.useTransaction ? [TransactionHooks.startTransaction] : []),
      ];

      // Execute pre-hooks
      for (const hook of preHooks) {
        await hook(context);
      }

      // Execute main handler
      const result = await handler(context);

      // Default post-hooks
      const postHooks = [
        ...(options.postHooks || []),
        AuditHooks.logOperation,
        ...(options.useTransaction ? [TransactionHooks.commitTransaction] : []),
      ];

      // Execute post-hooks
      for (const hook of postHooks) {
        await hook(context);
      }

      HttpResponse.send(res, result);
    } catch (error) {
      // Handle transaction rollback
      if (options.useTransaction) {
        await TransactionHooks.rollbackTransaction(req.context);
      }

      HttpResponse.handleResult(res, error);
    }
  });

  return middlewares;
}
