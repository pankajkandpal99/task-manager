import { RequestContext } from "../middleware/context";

export const AuditHooks = {
  async logOperation(context: RequestContext) {
    if (context.user) {
      await context.prisma.auditLog.create({
        data: {
          userId: context.user.id,
          action: context.req?.method ?? "unknown",
          endpoint: context.req?.originalUrl ?? "unknown",
          status: context.res?.statusCode ?? 500,
        },
      });
    }
  },
};
