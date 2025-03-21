import { RequestContext } from "../middleware/context";

export const TransactionHooks = {
  async startTransaction(context: RequestContext) {
    context.transaction = await context.prisma.$transaction();
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
