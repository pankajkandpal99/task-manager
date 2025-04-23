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
exports.processMultipleImages = exports.processImage = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const logger_1 = require("../utils/logger");
const sharp_1 = __importDefault(require("sharp"));
const DEFAULT_SIZES = [
    { width: 1920, suffix: "lg", quality: 85 },
    { width: 800, suffix: "md", quality: 80 },
    { width: 400, suffix: "sm", quality: 75 },
];
const processImage = (fileInfo_1, ...args_1) => __awaiter(void 0, [fileInfo_1, ...args_1], void 0, function* (fileInfo, options = {}) {
    const { sizes = DEFAULT_SIZES, optimizeOriginal = true, deleteOriginal = false, outputFormat, outputQuality = 85, } = options;
    if (!fileInfo.mimetype.startsWith("image/")) {
        logger_1.logger.info(`File ${fileInfo.filename} is not an image, skipping processing`);
        return { original: fileInfo, variants: [] };
    }
    const originalPath = fileInfo.path;
    const fileDir = path_1.default.dirname(originalPath);
    const fileName = path_1.default.basename(originalPath, path_1.default.extname(originalPath));
    const fileExt = outputFormat
        ? `.${outputFormat}`
        : path_1.default.extname(originalPath);
    const variants = [];
    try {
        let imageProcessor = (0, sharp_1.default)(originalPath);
        const metadata = yield imageProcessor.metadata();
        if (optimizeOriginal) {
            const optimizedPath = path_1.default.join(fileDir, `${fileName}-optimized${fileExt}`);
            if (outputFormat) {
                yield imageProcessor[outputFormat]({ quality: outputQuality }).toFile(optimizedPath);
            }
            else if (fileExt === ".jpg" || fileExt === ".jpeg") {
                yield imageProcessor
                    .jpeg({ quality: outputQuality })
                    .toFile(optimizedPath);
            }
            else if (fileExt === ".png") {
                yield imageProcessor
                    .png({ quality: outputQuality })
                    .toFile(optimizedPath);
            }
            else if (fileExt === ".webp") {
                yield imageProcessor
                    .webp({ quality: outputQuality })
                    .toFile(optimizedPath);
            }
            else {
                yield imageProcessor.toFile(optimizedPath);
            }
            if (deleteOriginal) {
                fs_1.default.unlinkSync(originalPath);
                fileInfo.path = optimizedPath;
                fileInfo.filename = path_1.default.basename(optimizedPath);
                if (outputFormat) {
                    fileInfo.mimetype = `image/${outputFormat}`;
                }
            }
        }
        for (const size of sizes) {
            const variantPath = path_1.default.join(fileDir, `${fileName}-${size.suffix}${fileExt}`);
            imageProcessor = (0, sharp_1.default)(originalPath);
            if (size.height) {
                imageProcessor = imageProcessor.resize(size.width, size.height, {
                    fit: "cover",
                    position: "centre",
                });
            }
            else {
                imageProcessor = imageProcessor.resize(size.width, null, {
                    withoutEnlargement: true,
                });
            }
            if (outputFormat) {
                imageProcessor = imageProcessor[outputFormat]({
                    quality: size.quality || outputQuality,
                });
            }
            else if (fileExt === ".jpg" || fileExt === ".jpeg") {
                imageProcessor = imageProcessor.jpeg({
                    quality: size.quality || outputQuality,
                });
            }
            else if (fileExt === ".png") {
                imageProcessor = imageProcessor.png({
                    quality: size.quality || outputQuality,
                });
            }
            else if (fileExt === ".webp") {
                imageProcessor = imageProcessor.webp({
                    quality: size.quality || outputQuality,
                });
            }
            yield imageProcessor.toFile(variantPath);
            const variantInfo = Object.assign(Object.assign({}, fileInfo), { filename: path_1.default.basename(variantPath), path: variantPath, size: fs_1.default.statSync(variantPath).size, mimetype: outputFormat ? `image/${outputFormat}` : fileInfo.mimetype });
            variants.push(variantInfo);
        }
        return { original: fileInfo, variants };
    }
    catch (error) {
        logger_1.logger.error(`Error processing image ${fileInfo.filename}:`, error);
        throw new Error(`Image processing failed: ${error.message}`);
    }
});
exports.processImage = processImage;
const processMultipleImages = (files_1, ...args_1) => __awaiter(void 0, [files_1, ...args_1], void 0, function* (files, options = {}) {
    const results = yield Promise.all(files
        .filter((file) => file.mimetype.startsWith("image/"))
        .map((file) => (0, exports.processImage)(file, options)));
    return {
        originals: results.map((result) => result.original),
        variants: results.flatMap((result) => result.variants),
    };
});
exports.processMultipleImages = processMultipleImages;
//# sourceMappingURL=image-processing.service.js.map