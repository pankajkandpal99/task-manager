"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_factory_1 = require("../../../../utils/api-factory");
const hero_section_controller_1 = require("../../controllers/admin/hero-section.controller");
const file_upload_utils_1 = require("../../../../utils/file-upload-utils");
const heroSectionSchema_1 = require("../../../../schema/admin/heroSectionSchema");
exports.default = (router) => {
    router.post("/admin/home/hero-section", (0, api_factory_1.createApiHandler)(hero_section_controller_1.HeroSectionController.createOrUpdateHeroSection, (0, file_upload_utils_1.withFileUpload)({
        requireAuth: true,
        requireAdmin: true,
        useTransaction: true,
        bodySchema: heroSectionSchema_1.heroSectionSchema,
    }, "hero-section-image", {
        convertTextToJson: true,
        validateBeforeAuth: false,
        pathStructure: "home/hero",
    })));
    router.get("/admin/home/hero-section", (0, api_factory_1.createApiHandler)(hero_section_controller_1.HeroSectionController.getHeroSection, {
        requireAuth: false,
        useTransaction: true,
    }));
};
//# sourceMappingURL=hero-section.route.js.map