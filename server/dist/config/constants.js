"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONFIG = exports.ERROR_MESSAGES = exports.ROLE = exports.StatusCodes = void 0;
var StatusCodes;
(function (StatusCodes) {
    StatusCodes[StatusCodes["OK"] = 200] = "OK";
    StatusCodes[StatusCodes["CREATED"] = 201] = "CREATED";
    StatusCodes[StatusCodes["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    StatusCodes[StatusCodes["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    StatusCodes[StatusCodes["FORBIDDEN"] = 403] = "FORBIDDEN";
    StatusCodes[StatusCodes["NOT_FOUND"] = 404] = "NOT_FOUND";
    StatusCodes[StatusCodes["CONFLICT"] = 409] = "CONFLICT";
    StatusCodes[StatusCodes["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
})(StatusCodes || (exports.StatusCodes = StatusCodes = {}));
var ROLE;
(function (ROLE) {
    ROLE["USER"] = "USER";
    ROLE["ADMIN"] = "ADMIN";
    ROLE["GUEST"] = "GUEST";
    ROLE["SUPER_ADMIN"] = "SUPER_ADMIN";
})(ROLE || (exports.ROLE = ROLE = {}));
exports.ERROR_MESSAGES = {
    INVALID_CREDENTIALS: "Invalid credentials",
    UNAUTHORIZED_ACCESS: "Unauthorized access",
    RESOURCE_NOT_FOUND: "Resource not found",
    DUPLICATE_ENTRY: "Duplicate entry found",
};
exports.CONFIG = {
    DEFAULT_PAGE_SIZE: 10,
    MAX_PAGE_SIZE: 100,
    PASSWORD_MIN_LENGTH: 8,
    JWT_COOKIE_NAME: "authToken",
};
//# sourceMappingURL=constants.js.map