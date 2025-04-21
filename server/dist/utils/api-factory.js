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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApiHandler = createApiHandler;
const auth_1 = require("../middleware/auth");
const service_response_1 = require("../utils/service-response");
const transactions_1 = require("../hooks/transactions");
const file_upload_hook_1 = require("../hooks/file-upload-hook");
const admin_auth_1 = require("../middleware/admin-auth");
const param_extractor_middleware_1 = require("../middleware/param-extractor.middleware");
function createApiHandler(handler, options = {}) {
    var _a, _b, _c, _d;
    const middlewares = [];
    middlewares.push((0, param_extractor_middleware_1.paramExtractorMiddleware)());
    middlewares.push((req, res, next) => {
        req.params = req.params || {};
        next();
    });
    middlewares.push((req, res, next) => {
        if (!req.params) {
            req.params = {};
        }
        next();
    });
    if (((_a = options.fileUpload) === null || _a === void 0 ? void 0 : _a.enabled) && ((_b = options.fileUpload) === null || _b === void 0 ? void 0 : _b.validateBeforeAuth)) {
        middlewares.push((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const context = req.context;
            try {
                const uploadOptions = Object.assign(Object.assign({}, (_a = options.fileUpload) === null || _a === void 0 ? void 0 : _a.options), { convertTextToJson: ((_b = options.fileUpload) === null || _b === void 0 ? void 0 : _b.convertTextToJson) !== false });
                yield file_upload_hook_1.FileUploadHooks.processFileUpload(context, uploadOptions);
                next();
            }
            catch (error) {
                service_response_1.HttpResponse.error(res, error instanceof Error
                    ? error.message
                    : "An unknown error occurred", 400, {
                    type: "FileUploadError",
                    details: process.env.NODE_ENV === "production" ? undefined : error,
                });
            }
        }));
    }
    if (options.requireAuth !== false) {
        middlewares.push(auth_1.requireAuth);
    }
    if (options.requireAdmin) {
        middlewares.push(admin_auth_1.requireAdmin);
    }
    if (((_c = options.fileUpload) === null || _c === void 0 ? void 0 : _c.enabled) && !((_d = options.fileUpload) === null || _d === void 0 ? void 0 : _d.validateBeforeAuth)) {
        middlewares.push((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const context = req.context;
            try {
                const uploadOptions = Object.assign(Object.assign({}, (_a = options.fileUpload) === null || _a === void 0 ? void 0 : _a.options), { convertTextToJson: ((_b = options.fileUpload) === null || _b === void 0 ? void 0 : _b.convertTextToJson) !== false });
                yield file_upload_hook_1.FileUploadHooks.processFileUpload(context, uploadOptions);
                next();
            }
            catch (error) {
                service_response_1.HttpResponse.error(res, error instanceof Error
                    ? error.message
                    : "An unknown error occurred", 400, {
                    type: "FileUploadError",
                    details: process.env.NODE_ENV === "production" ? undefined : error,
                });
            }
        }));
    }
    if (options.bodySchema || options.querySchema) {
        middlewares.push((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (options.bodySchema) {
                    req.body = yield options.bodySchema.parseAsync(req.body);
                }
                if (options.querySchema) {
                    req.query = (yield options.querySchema.parseAsync(req.query));
                }
                next();
            }
            catch (error) {
                service_response_1.HttpResponse.error(res, "Validation failed", 400, {
                    type: "ValidationError",
                    details: error,
                });
            }
        }));
    }
    middlewares.push((req, res) => __awaiter(this, void 0, void 0, function* () {
        const context = req.context;
        let transactionStarted = false;
        try {
            if (options.useTransaction) {
                yield transactions_1.TransactionHooks.startTransaction(context);
                transactionStarted = true;
            }
            const result = yield handler(context);
            if (!res.headersSent) {
                if (result && typeof result === "object" && "success" in result) {
                    if (result.success) {
                        service_response_1.HttpResponse.send(res, result.data, result.code);
                    }
                    else {
                        service_response_1.HttpResponse.error(res, result.error.message, result.code || 500, {
                            type: result.error.name,
                            details: process.env.NODE_ENV === "production"
                                ? undefined
                                : { stack: result.error.stack },
                        });
                    }
                }
                else if (result !== undefined) {
                    service_response_1.HttpResponse.send(res, result);
                }
                else {
                    service_response_1.HttpResponse.send(res, { success: true });
                }
            }
            if (transactionStarted) {
                yield transactions_1.TransactionHooks.commitTransaction(context);
            }
        }
        catch (error) {
            if (transactionStarted) {
                yield transactions_1.TransactionHooks.rollbackTransaction(context);
            }
            if (!res.headersSent) {
                if (error instanceof Error) {
                    const statusCode = "statusCode" in error ? error.statusCode : 500;
                    service_response_1.HttpResponse.error(res, error.message, statusCode, {
                        type: error.name,
                        details: process.env.NODE_ENV === "production"
                            ? undefined
                            : { stack: error.stack },
                    });
                }
                else {
                    service_response_1.HttpResponse.error(res, "An unknown error occurred", 500, {
                        type: "UnknownError",
                        details: process.env.NODE_ENV === "production"
                            ? undefined
                            : { message: String(error) },
                    });
                }
            }
        }
    }));
    return middlewares;
}
//# sourceMappingURL=api-factory.js.map