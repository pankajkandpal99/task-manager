import { NotFoundError } from "../../../../error-handler";
import { RequestContext } from "../../../../middleware/context";
import { HeroSection } from "../../../../models/hero-section.model";
import { HttpResponse } from "../../../../utils/service-response";
import { logger } from "../../../../utils/logger";

export const HeroSectionController = {
  createOrUpdateHeroSection: async (context: RequestContext) => {
    try {
      const result = await context.withTransaction(async (session) => {
        const { body, files } = context;

        const imageUrls =
          files?.map((file) => `/uploads/${file.filename}`) || [];
        const allImages = [...(body.existingImages || []), ...imageUrls];

        const heroData = {
          ...body,
          backgroundImages: allImages,
          updatedBy: context.user?.id,
        };

        const heroSection = await HeroSection.findOneAndUpdate({}, heroData, {
          new: true,
          upsert: true,
          session,
        });

        console.log("hero sectio controller response : ", heroSection);

        if (!heroSection) {
          throw new NotFoundError("Hero section not found");
        }

        return heroSection.toObject();
      });

      return HttpResponse.send(context.res, result, 200);
    } catch (error) {
      logger.error("Error updating hero section:", error);
      throw error;
    }
  },

  getHeroSection: async (context: RequestContext) => {
    try {
      const heroSection = await HeroSection.findOne({});
      if (!heroSection) {
        throw new NotFoundError("Hero section not found");
      }
      return HttpResponse.send(context.res, heroSection.toObject(), 200);
    } catch (error) {
      logger.error("Error fetching hero section:", error);
      throw error;
    }
  },
};
