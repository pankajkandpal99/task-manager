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
exports.tapAsync = exports.pipeAsync = exports.handleResult = exports.tryCatch = void 0;
const service_response_1 = require("./service-response");
const tryCatch = (fn, errorHandler) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield fn();
        return { success: true, data, code: 200 };
    }
    catch (error) {
        return {
            success: false,
            error: errorHandler
                ? errorHandler(error)
                : error instanceof Error
                    ? error
                    : new Error(String(error)),
            code: error instanceof Error && "statusCode" in error
                ? error.statusCode
                : 500,
        };
    }
});
exports.tryCatch = tryCatch;
const handleResult = (res) => (result) => __awaiter(void 0, void 0, void 0, function* () {
    if (res.headersSent) {
        console.log("⚠️ Response already sent, skipping duplicate response");
        return;
    }
    if (result.success) {
        console.log("Sending success response...");
        return service_response_1.HttpResponse.send(res, result.data, result.code);
    }
    else {
        console.log("Sending error response...");
        return service_response_1.HttpResponse.error(res, result.error.message, result.code || 500, {
            type: result.error.name,
            details: process.env.NODE_ENV === "production"
                ? undefined
                : { stack: result.error.stack },
        });
    }
});
exports.handleResult = handleResult;
const pipeAsync = (...fns) => (x) => __awaiter(void 0, void 0, void 0, function* () {
    return fns.reduce((v, f) => __awaiter(void 0, void 0, void 0, function* () { return f(yield v); }), Promise.resolve(x));
});
exports.pipeAsync = pipeAsync;
const tapAsync = (fn) => (x) => __awaiter(void 0, void 0, void 0, function* () {
    yield fn(x);
    return x;
});
exports.tapAsync = tapAsync;
//# sourceMappingURL=result.utils.js.map