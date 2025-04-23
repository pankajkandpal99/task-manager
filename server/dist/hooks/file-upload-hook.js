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
exports.FileUploadHooks = void 0;
const file_upload_1 = require("../lib/file-upload");
const logger_1 = require("../utils/logger");
const path_1 = __importDefault(require("path"));
exports.FileUploadHooks = {
    processFileUpload(context_1) {
        return __awaiter(this, arguments, void 0, function* (context, options = {}) {
            if (!context.req.is("multipart/form-data"))
                return;
            try {
                const { files, fields } = yield (0, file_upload_1.handleFileUpload)(context.req, options);
                context.files = files;
                context.imageVariants = [];
                let processedFields = Object.assign({}, fields);
                if (options.convertTextToJson) {
                    processedFields = this.convertFieldsToJson(fields);
                }
                context.body = Object.assign(Object.assign(Object.assign({}, context.body), processedFields), { uploadPath: options.pathStructure
                        ? path_1.default.join(options.destination || "uploads", options.pathStructure)
                        : options.destination || "uploads" });
                let filesByField = {};
                if (context.files && context.files.length > 0) {
                    filesByField = context.files.reduce((acc, file) => {
                        if (!acc[file.fieldname]) {
                            acc[file.fieldname] = [];
                        }
                        acc[file.fieldname].push(file);
                        return acc;
                    }, {});
                    Object.keys(filesByField).forEach((fieldname) => {
                        if (fieldname === "backgroundImages") {
                            context.body[fieldname] = filesByField[fieldname];
                        }
                        else if (filesByField[fieldname].length === 1) {
                            context.body[fieldname] = filesByField[fieldname][0];
                        }
                        else {
                            context.body[fieldname] = filesByField[fieldname];
                        }
                    });
                }
                if (options.fieldMapping && options.fieldMapping.length > 0) {
                    this.processFieldMappings(context, filesByField, options.fieldMapping);
                }
                if (options.combineExistingFiles &&
                    options.combineExistingFiles.length > 0) {
                    this.processCombinedFiles(context, filesByField, processedFields, options.combineExistingFiles);
                }
                context.req.body = context.body;
            }
            catch (error) {
                logger_1.logger.error("File upload processing failed:", error);
                throw error;
            }
        });
    },
    processFieldMappings(context, filesByField, fieldMappings = []) {
        fieldMappings.forEach((mapping) => {
            if (filesByField[mapping.sourceField]) {
                const transformPath = mapping.transformPath ||
                    ((filename) => `/uploads/${filename}`);
                const mappedFiles = filesByField[mapping.sourceField].map((file) => transformPath(file.filename));
                if (mapping.isArray) {
                    context.body[mapping.targetField] = mappedFiles;
                }
                else if (mappedFiles.length === 1) {
                    context.body[mapping.targetField] = mappedFiles[0];
                }
                else {
                    context.body[mapping.targetField] = mappedFiles;
                }
            }
        });
    },
    processCombinedFiles(context, filesByField, processedFields, combineOptions = []) {
        combineOptions.forEach((option) => {
            var _a;
            try {
                let existingFiles = [];
                if (processedFields[option.existingFieldName]) {
                    existingFiles = this.parseArrayField(processedFields[option.existingFieldName]);
                }
                const newFiles = ((_a = filesByField[option.newFileFieldName]) === null || _a === void 0 ? void 0 : _a.map((file) => `/uploads/${file.filename}`)) || [];
                context.body[option.targetFieldName] = [...existingFiles, ...newFiles];
            }
            catch (error) {
                logger_1.logger.error(`Error processing combined files for field ${option.targetFieldName}:`, error);
            }
        });
    },
    parseArrayField(field) {
        if (typeof field === "string") {
            try {
                const parsed = JSON.parse(field);
                return Array.isArray(parsed) ? parsed : [parsed];
            }
            catch (e) {
                return [field];
            }
        }
        else if (Array.isArray(field)) {
            return field;
        }
        else if (field) {
            return [field];
        }
        return [];
    },
    convertFieldsToJson(fields) {
        const result = {};
        for (const [key, value] of Object.entries(fields)) {
            if (typeof value === "string") {
                try {
                    if ((value.trim().startsWith("{") && value.trim().endsWith("}")) ||
                        (value.trim().startsWith("[") && value.trim().endsWith("]"))) {
                        result[key] = JSON.parse(value);
                        continue;
                    }
                    if (key.endsWith("[]")) {
                        const baseKey = key.slice(0, -2);
                        if (!result[baseKey]) {
                            result[baseKey] = [];
                        }
                        result[baseKey].push(value);
                        continue;
                    }
                }
                catch (e) {
                    logger_1.logger.debug(`Failed to parse field ${key} as JSON`, e);
                }
            }
            result[key] = value;
        }
        return result;
    },
};
//# sourceMappingURL=file-upload-hook.js.map