import { RequestContext } from "../../../../middleware/context";
import { logger } from "../../../../utils/logger";
import { HttpResponse } from "../../../../utils/service-response";

export const GameSectionController = {
  createOrUpdateGameSection: async (context: RequestContext) => {
    try {
      const result = await context.withTransaction(async (session) => {
        const { body, files } = context;
        console.log("body : ", body);
        console.log("files : ", files);

        return;
      });

      return HttpResponse.send(context.res, result, 200);
    } catch (error) {
      logger.error("Error updating hero section:", error);
      throw error;
    }
  },

  getGameSection: async (context: RequestContext) => {
    try {
      const result = await context.withTransaction(async (session) => {
        return;
      });

      return HttpResponse.send(context.res, result, 200);
    } catch (error) {
      logger.error("Error fetching hero section:", error);
      throw error;
    }
  },
};
