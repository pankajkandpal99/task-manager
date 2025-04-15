import { NotFoundError } from "../../../../error-handler";
import { RequestContext } from "../../../../middleware/context";
import { HeroSection } from "../../../../models/hero-section.model";
import { HttpResponse } from "../../../../utils/service-response";
import { logger } from "../../../../utils/logger";
import { ImageUtils } from "../../../../utils/image-utils";

export const HeroSectionController = {
  createOrUpdateHeroSection: async (context: RequestContext) => {
    try {
      const result = await context.withTransaction(async (session) => {
        const { body, files } = context;
        const imageUrls = files?.map((file) => file.publicUrl) || [];

        let existingImages: string[] = [];

        if (body.backgroundImages && Array.isArray(body.backgroundImages)) {
          const stringUrls = body.backgroundImages.filter(
            (img: any) => typeof img === "string"
          );

          if (stringUrls.length > 0) {
            existingImages = [
              ...existingImages,
              ...ImageUtils.processImageUrls(stringUrls),
            ];
          }
        }

        if (body.existingImages) {
          const imgArray = Array.isArray(body.existingImages)
            ? body.existingImages
            : [body.existingImages];

          existingImages = [
            ...existingImages,
            ...ImageUtils.processImageUrls(imgArray),
          ];
        }

        console.log("Existing images after processing:", existingImages);

        const allImages = [...existingImages, ...imageUrls];
        console.log("All images:", allImages);

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
      const result = await context.withTransaction(async (session) => {
        const heroSection = await HeroSection.findOne({})
          .session(session)
          .readConcern("majority")
          .lean();

        if (!heroSection) {
          throw new NotFoundError("Hero section not found");
        }

        return heroSection;
      });

      return HttpResponse.send(context.res, result, 200);
    } catch (error) {
      logger.error("Error fetching hero section:", error);
      throw error;
    }
  },
};
