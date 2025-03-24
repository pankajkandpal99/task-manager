import { RequestContext } from "../middleware/context";
import { PrismaClient } from "@prisma/client";

export const TransactionHooks = {
  async startTransaction(context: RequestContext) {
    if (!context.transaction) {
      context.transaction = await context.prisma.$transaction({
        // We can customize transaction options here if needed
        // maxWait: 5000, // default: 2000
        // timeout: 10000, // default: 5000
        isolationLevel: "ReadCommitted", // We can choose appropriate isolation level
      });
    }
    return context.transaction;
  },

  async commitTransaction(context: RequestContext) {
    if (context.transaction) {
      await context.transaction.$commit();
      context.transaction = undefined;
    }
  },

  async rollbackTransaction(context: RequestContext) {
    if (context.transaction) {
      await context.transaction.$rollback();
      context.transaction = undefined;
    }
  },
};
