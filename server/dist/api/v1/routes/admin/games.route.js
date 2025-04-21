"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gameSectionSchema_1 = require("./../../../../schema/admin/gameSectionSchema");
const api_factory_1 = require("../../../../utils/api-factory");
const game_controller_1 = require("../../controllers/admin/game.controller");
const file_upload_utils_1 = require("../../../../utils/file-upload-utils");
exports.default = (router) => {
    router.post("/admin/games", (0, api_factory_1.createApiHandler)(game_controller_1.GameSectionController.createOrUpdateGameSection, (0, file_upload_utils_1.withFileUpload)({
        requireAuth: true,
        requireAdmin: true,
        useTransaction: true,
        bodySchema: gameSectionSchema_1.gameSchema,
    }, "game-thumbnail", {
        convertTextToJson: true,
        validateBeforeAuth: false,
        pathStructure: "games",
    })));
    router.get("/admin/games", (0, api_factory_1.createApiHandler)(game_controller_1.GameSectionController.getAllGames, {
        useTransaction: true,
        requireAuth: false,
    }));
    router.put("/admin/games/:id", (0, api_factory_1.createApiHandler)(game_controller_1.GameSectionController.updateGame, (0, file_upload_utils_1.withFileUpload)({
        requireAuth: true,
        requireAdmin: true,
        useTransaction: true,
        bodySchema: gameSectionSchema_1.gameUpdateSchema,
    }, "game-thumbnail", {
        convertTextToJson: true,
        validateBeforeAuth: false,
        pathStructure: "games",
    })));
    router.delete("/admin/games/:id", (0, api_factory_1.createApiHandler)(game_controller_1.GameSectionController.deleteGame, {
        useTransaction: true,
        requireAuth: true,
        requireAdmin: true,
    }));
};
//# sourceMappingURL=games.route.js.map