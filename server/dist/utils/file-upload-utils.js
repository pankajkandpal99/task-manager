"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withFileUpload = withFileUpload;
const file_upload_config_1 = require("../config/file-upload-config");
function withFileUpload(options = {}, configKey, multipartOptions) {
    var _a, _b;
    return Object.assign(Object.assign({}, options), { fileUpload: {
            enabled: true,
            convertTextToJson: (_a = multipartOptions === null || multipartOptions === void 0 ? void 0 : multipartOptions.convertTextToJson) !== null && _a !== void 0 ? _a : true,
            validateBeforeAuth: (_b = multipartOptions === null || multipartOptions === void 0 ? void 0 : multipartOptions.validateBeforeAuth) !== null && _b !== void 0 ? _b : false,
            options: Object.assign(Object.assign({}, (0, file_upload_config_1.getFileUploadConfig)(configKey)), { pathStructure: multipartOptions === null || multipartOptions === void 0 ? void 0 : multipartOptions.pathStructure, preservePath: true }),
        } });
}
//# sourceMappingURL=file-upload-utils.js.map