"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageUtils = void 0;
const env_1 = require("../config/env");
exports.ImageUtils = {
    processImageUrls(images) {
        if (!images || !Array.isArray(images))
            return [];
        return images.map((image) => {
            if (typeof image !== "string") {
                return image.path.replace(/^.*\/uploads\//, "/uploads/");
            }
            return this.normalizeImageUrl(image);
        });
    },
    normalizeImageUrl(imageUrl) {
        if (!imageUrl)
            return "";
        const baseUrl = env_1.env.BASE_URL || "http://localhost:8800";
        return imageUrl.replace(new RegExp(`^${baseUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`), "");
    },
};
//# sourceMappingURL=image-utils.js.map