"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileValidator = void 0;
const zod_1 = require("zod");
exports.fileValidator = zod_1.z
    .object({
    fieldname: zod_1.z.string(),
    filename: zod_1.z.string(),
    encoding: zod_1.z.string(),
    mimetype: zod_1.z.string(),
    size: zod_1.z.number(),
    destination: zod_1.z.string(),
    path: zod_1.z.string(),
    originalFilename: zod_1.z.string().optional(),
})
    .passthrough();
//# sourceMappingURL=file-validator.js.map