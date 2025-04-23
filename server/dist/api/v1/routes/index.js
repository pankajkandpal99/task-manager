"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const express_1 = require("express");
const fs_1 = require("fs");
const path_1 = require("path");
const router = (0, express_1.Router)();
const routesPath = __dirname;
const findRouteFiles = (dir) => {
    const files = (0, fs_1.readdirSync)(dir);
    let routeFiles = [];
    files.forEach((file) => {
        const fullPath = (0, path_1.join)(dir, file);
        if ((0, fs_1.statSync)(fullPath).isDirectory()) {
            routeFiles = [...routeFiles, ...findRouteFiles(fullPath)];
        }
        else if (file.endsWith(".route.ts") && file !== "index.ts") {
            routeFiles.push(fullPath);
        }
    });
    return routeFiles;
};
const loadRoutes = () => __awaiter(void 0, void 0, void 0, function* () {
    const routeFiles = findRouteFiles(routesPath);
    for (const file of routeFiles) {
        try {
            const route = yield Promise.resolve(`${file}`).then(s => __importStar(require(s)));
            if (typeof route.default === "function") {
                route.default(router);
            }
        }
        catch (error) {
            console.error(`Failed to load route ${file}:`, error);
        }
    }
});
loadRoutes().catch((error) => {
    console.error("Route loading failed:", error);
    process.exit(1);
});
exports.default = router;
//# sourceMappingURL=index.js.map