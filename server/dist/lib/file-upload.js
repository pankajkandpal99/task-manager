"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFile = exports.getFileStream = exports.handleFileUpload = void 0;
const busboy_1 = __importDefault(require("busboy"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const logger_1 = require("../utils/logger");
const DEFAULT_OPTIONS = {
    maxFileSize: 10 * 1024 * 1024,
    allowedMimeTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
    destination: "uploads",
};
const ensureDirectoryExists = (dirPath) => {
    const absolutePath = path_1.default.resolve(dirPath);
    if (!fs_1.default.existsSync(absolutePath)) {
        fs_1.default.mkdirSync(absolutePath, { recursive: true });
    }
};
const generateUniqueFilename = (originalName) => {
    const ext = path_1.default.extname(originalName);
    return `${(0, uuid_1.v4)()}${ext}`;
};
const validateFile = (fileInfo, options) => {
    if (fileInfo.size > (options.maxFileSize || DEFAULT_OPTIONS.maxFileSize)) {
        throw new Error(`File ${fileInfo.filename} exceeds maximum size of ${options.maxFileSize / 1024 / 1024}MB`);
    }
    const allowedTypes = options.allowedMimeTypes || DEFAULT_OPTIONS.allowedMimeTypes;
    if (!allowedTypes.includes(fileInfo.mimetype)) {
        throw new Error(`File type ${fileInfo.mimetype} is not allowed. Allowed types: ${allowedTypes.join(", ")}`);
    }
};
const handleFileUpload = (req, options = {}) => {
    const mergedOptions = Object.assign(Object.assign({}, DEFAULT_OPTIONS), options);
    const basePath = path_1.default.resolve(mergedOptions.destination);
    const fullDestination = mergedOptions.pathStructure
        ? path_1.default.join(basePath, mergedOptions.pathStructure)
        : basePath;
    ensureDirectoryExists(fullDestination);
    return new Promise((resolve, reject) => {
        const busboy = (0, busboy_1.default)({
            headers: req.headers,
            limits: {
                fileSize: mergedOptions.maxFileSize,
            },
        });
        const files = [];
        const fields = {};
        busboy.on("file", (fieldname, file, info) => {
            const { filename, encoding, mimeType } = info;
            const chunks = [];
            file.on("data", (chunk) => {
                chunks.push(chunk);
            });
            file.on("end", () => {
                try {
                    const buffer = Buffer.concat(chunks);
                    const uniqueFilename = generateUniqueFilename(filename);
                    const destinationPath = path_1.default.join(fullDestination, uniqueFilename);
                    const publicUrlPath = mergedOptions.pathStructure
                        ? path_1.default.join(mergedOptions.pathStructure, uniqueFilename)
                        : uniqueFilename;
                    const publicUrl = `/uploads/${publicUrlPath.replace(/\\/g, "/")}`;
                    const fileInfo = {
                        fieldname,
                        filename: uniqueFilename,
                        encoding,
                        mimetype: mimeType,
                        size: buffer.length,
                        originalFilename: filename,
                    };
                    validateFile(fileInfo, mergedOptions);
                    fs_1.default.writeFileSync(destinationPath, buffer);
                    files.push(Object.assign(Object.assign({}, fileInfo), { destination: fullDestination, path: destinationPath, publicUrl }));
                }
                catch (error) {
                    logger_1.logger.error(`File processing error: ${error}`);
                    file.resume();
                }
            });
        });
        busboy.on("field", (fieldname, val) => {
            if (fieldname.endsWith("[]")) {
                const baseFieldName = fieldname.substring(0, fieldname.length - 2);
                if (!fields[baseFieldName]) {
                    fields[baseFieldName] = [];
                }
                fields[baseFieldName].push(val);
            }
            else {
                if (fields[fieldname] !== undefined) {
                    if (!Array.isArray(fields[fieldname])) {
                        fields[fieldname] = [fields[fieldname]];
                    }
                    fields[fieldname].push(val);
                }
                else {
                    fields[fieldname] = val;
                }
            }
        });
        busboy.on("finish", () => {
            resolve({ files, fields });
        });
        busboy.on("error", (error) => {
            logger_1.logger.error("Busboy error:", error);
            reject(error);
        });
        req.pipe(busboy);
    });
};
exports.handleFileUpload = handleFileUpload;
const getFileStream = (filePath) => {
    if (!fs_1.default.existsSync(filePath)) {
        throw new Error("File not found");
    }
    return fs_1.default.createReadStream(filePath);
};
exports.getFileStream = getFileStream;
const deleteFile = (filePath) => {
    return new Promise((resolve, reject) => {
        fs_1.default.unlink(filePath, (error) => {
            if (error) {
                logger_1.logger.error(`Error deleting file ${filePath}:`, error);
                reject(error);
            }
            else {
                logger_1.logger.info(`File deleted successfully: ${filePath}`);
                resolve();
            }
        });
    });
};
exports.deleteFile = deleteFile;
//# sourceMappingURL=file-upload.js.map