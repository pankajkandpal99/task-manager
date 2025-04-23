"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileUploadConfigs = void 0;
exports.getFileUploadConfig = getFileUploadConfig;
exports.fileUploadConfigs = {
    "hero-section-image": {
        maxFileSize: 10 * 1024 * 1024,
        allowedMimeTypes: ["image/jpeg", "image/png", "image/webp"],
        processImages: true,
        imageProcessingOptions: {
            sizes: [
                { width: 1920, suffix: "xl", quality: 85 },
                { width: 1280, suffix: "lg", quality: 80 },
                { width: 768, suffix: "md", quality: 75 },
                { width: 480, suffix: "sm", quality: 70 },
            ],
            outputFormat: "webp",
            optimizeOriginal: true,
        },
    },
    "profile-image": {
        maxFileSize: 5 * 1024 * 1024,
        allowedMimeTypes: ["image/jpeg", "image/png", "image/webp"],
        processImages: true,
        imageProcessingOptions: {
            sizes: [
                { width: 300, suffix: "lg", quality: 85 },
                { width: 150, suffix: "md", quality: 80 },
                { width: 50, suffix: "sm", quality: 75 },
            ],
            outputFormat: "webp",
            optimizeOriginal: true,
        },
    },
    "product-image": {
        maxFileSize: 8 * 1024 * 1024,
        allowedMimeTypes: ["image/jpeg", "image/png", "image/webp"],
        processImages: true,
        imageProcessingOptions: {
            sizes: [
                { width: 1200, suffix: "xl", quality: 85 },
                { width: 800, suffix: "lg", quality: 80 },
                { width: 400, suffix: "md", quality: 75 },
                { width: 200, suffix: "sm", quality: 70 },
            ],
            outputFormat: "webp",
            optimizeOriginal: true,
        },
    },
    "gallery-image": {
        maxFileSize: 15 * 1024 * 1024,
        allowedMimeTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
        processImages: true,
        imageProcessingOptions: {
            sizes: [
                { width: 2000, suffix: "xl", quality: 90 },
                { width: 1200, suffix: "lg", quality: 85 },
                { width: 800, suffix: "md", quality: 80 },
                { width: 400, suffix: "sm", quality: 75 },
            ],
            outputFormat: "webp",
            optimizeOriginal: true,
        },
    },
    "game-image": {
        maxFileSize: 15 * 1024 * 1024,
        allowedMimeTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
        processImages: true,
        imageProcessingOptions: {
            sizes: [
                { width: 2000, suffix: "xl", quality: 90 },
                { width: 1200, suffix: "lg", quality: 85 },
                { width: 800, suffix: "md", quality: 80 },
                { width: 400, suffix: "sm", quality: 75 },
            ],
            outputFormat: "webp",
            optimizeOriginal: true,
        },
    },
    "game-thumbnail": {
        maxFileSize: 5 * 1024 * 1024,
        allowedMimeTypes: ["image/jpeg", "image/png", "image/webp"],
        processImages: true,
        imageProcessingOptions: {
            sizes: [
                { width: 400, suffix: "lg", quality: 85 },
                { width: 200, suffix: "md", quality: 80 },
                { width: 100, suffix: "sm", quality: 75 },
            ],
            outputFormat: "webp",
            optimizeOriginal: true,
        },
    },
    "game-screenshot": {
        maxFileSize: 10 * 1024 * 1024,
        allowedMimeTypes: ["image/jpeg", "image/png", "image/webp"],
        processImages: true,
        imageProcessingOptions: {
            sizes: [
                { width: 1920, suffix: "xl", quality: 90 },
                { width: 1280, suffix: "lg", quality: 85 },
                { width: 768, suffix: "md", quality: 80 },
                { width: 480, suffix: "sm", quality: 75 },
            ],
            outputFormat: "webp",
            optimizeOriginal: true,
        },
    },
    default: {
        maxFileSize: 5 * 1024 * 1024,
        allowedMimeTypes: ["image/jpeg", "image/png", "image/webp"],
        processImages: true,
        imageProcessingOptions: {
            sizes: [
                { width: 800, suffix: "lg", quality: 80 },
                { width: 400, suffix: "md", quality: 75 },
            ],
            outputFormat: "webp",
            optimizeOriginal: true,
        },
    },
};
function getFileUploadConfig(configKey = "default") {
    if (Array.isArray(configKey)) {
        return configKey.reduce((mergedConfig, key) => {
            const config = exports.fileUploadConfigs[key] ||
                exports.fileUploadConfigs.default;
            return Object.assign(Object.assign({}, mergedConfig), config);
        }, {});
    }
    return (exports.fileUploadConfigs[configKey] ||
        exports.fileUploadConfigs.default);
}
//# sourceMappingURL=file-upload-config.js.map