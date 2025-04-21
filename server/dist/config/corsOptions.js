"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.staticCorsOptions = exports.corsOptions = void 0;
const env_1 = require("./env");
const allowedOrigins = env_1.env.ALLOWED_ORIGINS
    ? env_1.env.ALLOWED_ORIGINS.split(",").map((o) => o.trim())
    : [];
exports.corsOptions = {
    origin: (origin, callback) => {
        if (env_1.env.NODE_ENV === "development") {
            return callback(null, true);
        }
        if (!origin) {
            return callback(null, true);
        }
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        console.warn(`CORS blocked for origin: ${origin}`);
        callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "X-Requested-With",
        "Accept",
        "Origin",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    optionsSuccessStatus: 204,
    maxAge: 86400,
    preflightContinue: false,
    exposedHeaders: ["Set-Cookie", "Authorization", "X-CSRF-Token"],
};
exports.staticCorsOptions = {
    origin: ((_a = env_1.env.ALLOWED_ORIGINS) === null || _a === void 0 ? void 0 : _a.split(",")[0]) || "*",
    credentials: true,
    optionsSuccessStatus: 200,
};
//# sourceMappingURL=corsOptions.js.map