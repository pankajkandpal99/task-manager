import { Router } from "express";
import { createApiHandler } from "../../../../utils/api-factory";
import { HeroSectionController } from "../../controllers/admin/hero-section.controller";
import { withFileUpload } from "../../../../utils/file-upload-utils";

export default (router: Router) => {
  router.post(
    "admin/home/hero-section",
    createApiHandler(
      HeroSectionController.createOrUpdateHeroSection,
      withFileUpload(
        {
          requireAuth: true,
          useTransaction: true,
          // bodySchema: heroSectionSchema,
        },
        "hero-section-image"
      )
    )
  );

  router.get(
    "admin/home/hero-section",
    createApiHandler(HeroSectionController.getHeroSection, {
      requireAuth: true,
      useTransaction: false,
    })
  );
};
