"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeroSectionController = void 0;
const error_handler_1 = require("../../../../error-handler");
const hero_section_model_1 = require("../../../../models/hero-section.model");
const service_response_1 = require("../../../../utils/service-response");
const logger_1 = require("../../../../utils/logger");
const image_utils_1 = require("../../../../utils/image-utils");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
exports.HeroSectionController = {
    createOrUpdateHeroSection: (context) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield context.withTransaction((session) => __awaiter(void 0, void 0, void 0, function* () {
                var _a;
                const { body, files } = context;
                const newImageUrls = (files === null || files === void 0 ? void 0 : files.map((file) => file.publicUrl).filter(Boolean)) || [];
                const existingHeroSection = yield hero_section_model_1.HeroSection.findOne({}).session(session);
                const oldImages = (existingHeroSection === null || existingHeroSection === void 0 ? void 0 : existingHeroSection.backgroundImages) || [];
                const imagesToKeep = new Set();
                if (Array.isArray(body.backgroundImages)) {
                    body.backgroundImages
                        .filter((img) => typeof img === "string")
                        .forEach((img) => {
                        const processedUrl = image_utils_1.ImageUtils.processImageUrls([img])[0];
                        if (processedUrl) {
                            imagesToKeep.add(processedUrl);
                        }
                    });
                }
                if (body.existingImages) {
                    const imgArray = Array.isArray(body.existingImages)
                        ? body.existingImages
                        : [body.existingImages];
                    image_utils_1.ImageUtils.processImageUrls(imgArray)
                        .filter(Boolean)
                        .forEach((img) => imagesToKeep.add(img));
                }
                const imagesToDelete = oldImages.filter((img) => !imagesToKeep.has(img));
                newImageUrls.forEach((url) => imagesToKeep.add(url));
                const allImages = Array.from(imagesToKeep);
                if (imagesToDelete.length > 0) {
                    yield Promise.allSettled(imagesToDelete.map((imagePath) => __awaiter(void 0, void 0, void 0, function* () {
                        try {
                            if (!imagePath)
                                return;
                            const relativePath = imagePath.replace(/^\/uploads\//, "");
                            const fullPath = path_1.default.join(process.cwd(), "public", "uploads", relativePath);
                            if (fs_1.default.existsSync(fullPath)) {
                                fs_1.default.unlinkSync(fullPath);
                                logger_1.logger.info(`Deleted old hero section image: ${fullPath}`);
                            }
                            else {
                                logger_1.logger.warn(`Hero section image not found at path: ${fullPath}`);
                            }
                        }
                        catch (err) {
                            logger_1.logger.error(`Failed to delete hero section image ${imagePath}:`, err);
                        }
                    })));
                }
                const heroData = Object.assign(Object.assign({}, body), { backgroundImages: allImages, updatedBy: (_a = context.user) === null || _a === void 0 ? void 0 : _a.id });
                const heroSection = yield hero_section_model_1.HeroSection.findOneAndUpdate({}, heroData, {
                    new: true,
                    upsert: true,
                    session,
                });
                if (!heroSection) {
                    throw new error_handler_1.NotFoundError("Hero section not found");
                }
                return heroSection.toObject();
            }));
            return service_response_1.HttpResponse.send(context.res, result, 200);
        }
        catch (error) {
            logger_1.logger.error("Error updating hero section:", error);
            throw error;
        }
    }),
    getHeroSection: (context) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield context.withTransaction((session) => __awaiter(void 0, void 0, void 0, function* () {
                const heroSection = yield hero_section_model_1.HeroSection.findOne({})
                    .session(session)
                    .readConcern("majority")
                    .lean();
                if (!heroSection) {
                    throw new error_handler_1.NotFoundError("Hero section not found");
                }
                return heroSection;
            }));
            return service_response_1.HttpResponse.send(context.res, result, 200);
        }
        catch (error) {
            logger_1.logger.error("Error fetching hero section:", error);
            throw error;
        }
    }),
};
//# sourceMappingURL=hero-section.controller.js.map