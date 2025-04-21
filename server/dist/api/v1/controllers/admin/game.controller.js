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
exports.GameSectionController = void 0;
const error_handler_1 = require("../../../../error-handler");
const game_model_1 = require("../../../../models/game.model");
const logger_1 = require("../../../../utils/logger");
const service_response_1 = require("../../../../utils/service-response");
exports.GameSectionController = {
    createOrUpdateGameSection: (context) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield context.withTransaction((session) => __awaiter(void 0, void 0, void 0, function* () {
                var _a;
                const { body, files } = context;
                const { title, description, category, gameUrl, isFeatured, isNew, minPlayers, maxPlayers, uploadPath, thumbnail, } = context.body;
                const existingGame = yield game_model_1.Game.findOne({ gameUrl }).session(session);
                if (existingGame) {
                    throw new error_handler_1.ConflictError("Game with this url already exists", {
                        field: "title",
                        value: title,
                    });
                }
                const game = new game_model_1.Game({
                    title,
                    description,
                    category,
                    gameUrl,
                    isFeatured: isFeatured === "true",
                    isNew: isNew === "true",
                    minPlayers: parseInt(minPlayers),
                    maxPlayers: parseInt(maxPlayers),
                    uploadPath,
                    thumbnail: {
                        publicUrl: thumbnail.publicUrl,
                        path: thumbnail.path,
                        originalFilename: thumbnail.originalFilename,
                        mimetype: thumbnail.mimetype,
                        size: thumbnail.size,
                    },
                    createdBy: (_a = context.user) === null || _a === void 0 ? void 0 : _a.id,
                });
                yield game.save({ session });
                return {
                    id: game._id.toString(),
                    title: game.title,
                    description: game.description,
                    category: game.category,
                    gameUrl: game.gameUrl,
                    isFeatured: game.isFeatured,
                    isNew: game.isNew,
                    minPlayers: game.minPlayers,
                    maxPlayers: game.maxPlayers,
                    thumbnail: game.thumbnail.publicUrl,
                };
            }));
            return service_response_1.HttpResponse.send(context.res, result, 200);
        }
        catch (error) {
            logger_1.logger.error("Error updating hero section:", error);
            throw error;
        }
    }),
    getAllGames: (context) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield context.withTransaction((session) => __awaiter(void 0, void 0, void 0, function* () {
                const games = yield game_model_1.Game.find({})
                    .session(session)
                    .sort({ createdAt: -1 })
                    .select("-uploadPath -thumbnail.path -__v")
                    .lean();
                return games.map((game) => (Object.assign(Object.assign({}, game), { id: game._id, thumbnail: game.thumbnail.publicUrl })));
            }));
            return service_response_1.HttpResponse.send(context.res, result, 200);
        }
        catch (error) {
            logger_1.logger.error("Error fetching all games:", error);
            throw error;
        }
    }),
    getGameById: (context) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield context.withTransaction((session) => __awaiter(void 0, void 0, void 0, function* () {
                const { id } = context.params;
                const game = yield game_model_1.Game.findById(id)
                    .session(session)
                    .select("-uploadPath -thumbnail.path -__v");
                if (!game) {
                    throw new error_handler_1.NotFoundError("Game not found");
                }
                return game;
            }));
            return service_response_1.HttpResponse.send(context.res, result, 200);
        }
        catch (error) {
            throw error;
        }
    }),
    updateGame: (context) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield context.withTransaction((session) => __awaiter(void 0, void 0, void 0, function* () {
                var _a, _b;
                const { id } = context.params;
                const updateData = context.body;
                const game = yield game_model_1.Game.findById({ _id: id }).session(session);
                if (!game) {
                    throw new error_handler_1.NotFoundError("Game not found");
                }
                if (context.files && ((_a = context.files) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                    const thumbnail = context.files[0];
                    updateData.thumbnail = {
                        publicUrl: thumbnail.publicUrl,
                        path: thumbnail.path,
                        originalFilename: thumbnail.originalFilename,
                        mimetype: thumbnail.mimetype,
                        size: thumbnail.size,
                    };
                }
                else if (updateData.thumbnail) {
                    if (typeof updateData.thumbnail === "string") {
                        updateData.thumbnail = Object.assign(Object.assign({}, game.thumbnail), { publicUrl: updateData.thumbnail });
                    }
                }
                else {
                    updateData.thumbnail = game.thumbnail;
                }
                if (updateData.isFeatured) {
                    updateData.isFeatured = updateData.isFeatured === "true";
                }
                if (updateData.isNew) {
                    updateData.isNew = updateData.isNew === "true";
                }
                if (updateData.minPlayers) {
                    updateData.minPlayers = parseInt(updateData.minPlayers);
                }
                if (updateData.maxPlayers) {
                    updateData.maxPlayers = parseInt(updateData.maxPlayers);
                }
                updateData.updatedBy = (_b = context.user) === null || _b === void 0 ? void 0 : _b.id;
                const updatedGame = yield game_model_1.Game.findByIdAndUpdate(id, updateData, {
                    new: true,
                    session,
                }).select("-uploadPath -thumbnail.path -__v");
                return updatedGame;
            }));
            return service_response_1.HttpResponse.send(context.res, result, 200);
        }
        catch (error) {
            throw error;
        }
    }),
    deleteGame: (context) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield context.withTransaction((session) => __awaiter(void 0, void 0, void 0, function* () {
                const { id } = context.params;
                const game = yield game_model_1.Game.findByIdAndDelete({ _id: id }).session(session);
                if (!game) {
                    throw new error_handler_1.NotFoundError("Game not found");
                }
                return {
                    success: true,
                    message: "Game deleted successfully",
                    deletedId: id,
                };
            }));
            return service_response_1.HttpResponse.send(context.res, result, 200);
        }
        catch (error) {
            throw error;
        }
    }),
};
//# sourceMappingURL=game.controller.js.map