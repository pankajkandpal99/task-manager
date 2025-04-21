import { NotFoundError } from "../../../../error-handler";
import { RequestContext } from "../../../../middleware/context";
import { HeroSection } from "../../../../models/hero-section.model";
import { HttpResponse } from "../../../../utils/service-response";
import { logger } from "../../../../utils/logger";
import { ImageUtils } from "../../../../utils/image-utils";
import fs from "fs";
import path from "path";

export const HeroSectionController = {
  createOrUpdateHeroSection: async (context: RequestContext) => {
    try {
      const result = await context.withTransaction(async (session) => {
        const { body, files } = context;
        const newImageUrls =
          files?.map((file) => file.publicUrl).filter(Boolean) || [];

        const existingHeroSection = await HeroSection.findOne({}).session(
          session
        );

        const oldImages = existingHeroSection?.backgroundImages || [];

        const imagesToKeep = new Set();

        if (Array.isArray(body.backgroundImages)) {
          body.backgroundImages
            .filter((img: any) => typeof img === "string")
            .forEach((img: string) => {
              const processedUrl = ImageUtils.processImageUrls([img])[0];
              if (processedUrl) {
                imagesToKeep.add(processedUrl);
              }
            });
        }

        if (body.existingImages) {
          const imgArray = Array.isArray(body.existingImages)
            ? body.existingImages
            : [body.existingImages];

          ImageUtils.processImageUrls(imgArray)
            .filter(Boolean)
            .forEach((img) => imagesToKeep.add(img));
        }

        const imagesToDelete = oldImages.filter(
          (img) => !imagesToKeep.has(img)
        );

        newImageUrls.forEach((url) => imagesToKeep.add(url));

        const allImages = Array.from(imagesToKeep);

        if (imagesToDelete.length > 0) {
          await Promise.allSettled(
            imagesToDelete.map(async (imagePath) => {
              try {
                if (!imagePath) return;

                const relativePath = imagePath.replace(/^\/uploads\//, "");
                const fullPath = path.join(
                  process.cwd(),
                  "public",
                  "uploads",
                  relativePath
                );

                if (fs.existsSync(fullPath)) {
                  fs.unlinkSync(fullPath);
                  logger.info(`Deleted old hero section image: ${fullPath}`);
                } else {
                  logger.warn(
                    `Hero section image not found at path: ${fullPath}`
                  );
                }
              } catch (err) {
                logger.error(
                  `Failed to delete hero section image ${imagePath}:`,
                  err
                );
              }
            })
          );
        }

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
