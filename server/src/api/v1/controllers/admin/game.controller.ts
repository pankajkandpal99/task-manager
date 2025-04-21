import { ConflictError, NotFoundError } from "../../../../error-handler";
import { RequestContext } from "../../../../middleware/context";
import { Game } from "../../../../models/game.model";
import { logger } from "../../../../utils/logger";
import { HttpResponse } from "../../../../utils/service-response";

export const GameSectionController = {
  createOrUpdateGameSection: async (context: RequestContext) => {
    try {
      const result = await context.withTransaction(async (session) => {
        const { body, files } = context;
        const {
          title,
          description,
          category,
          gameUrl,
          isFeatured,
          isNew,
          minPlayers,
          maxPlayers,
          uploadPath,
          thumbnail,
        } = context.body;

        const existingGame = await Game.findOne({ gameUrl }).session(session);
        if (existingGame) {
          throw new ConflictError("Game with this url already exists", {
            field: "title",
            value: title,
          });
        }

        const game = new Game({
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
          createdBy: context.user?.id,
        });

        await game.save({ session });

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
      });

      return HttpResponse.send(context.res, result, 200);
    } catch (error) {
      logger.error("Error updating hero section:", error);
      throw error;
    }
  },

  getAllGames: async (context: RequestContext) => {
    try {
      const result = await context.withTransaction(async (session) => {
        const games = await Game.find({})
          .session(session)
          .sort({ createdAt: -1 })
          .select("-uploadPath -thumbnail.path -__v")
          .lean();

        return games.map((game) => ({
          ...game,
          id: game._id,
          thumbnail: game.thumbnail.publicUrl,
        }));
      });

      return HttpResponse.send(context.res, result, 200);
    } catch (error) {
      logger.error("Error fetching all games:", error);
      throw error;
    }
  },

  getGameById: async (context: RequestContext) => {
    try {
      const result = await context.withTransaction(async (session) => {
        const { id } = context.params;

        const game = await Game.findById(id)
          .session(session)
          .select("-uploadPath -thumbnail.path -__v");

        if (!game) {
          throw new NotFoundError("Game not found");
        }

        return game;
      });

      return HttpResponse.send(context.res, result, 200);
    } catch (error) {
      throw error;
    }
  },

  updateGame: async (context: RequestContext) => {
    try {
      const result = await context.withTransaction(async (session) => {
        const { id } = context.params;
        const updateData = context.body;

        const game = await Game.findById({ _id: id }).session(session);

        if (!game) {
          throw new NotFoundError("Game not found");
        }

        // Handle thumbnail updates
        if (context.files && context.files?.length > 0) {
          const thumbnail = context.files[0];
          updateData.thumbnail = {
            publicUrl: thumbnail.publicUrl,
            path: thumbnail.path,
            originalFilename: thumbnail.originalFilename,
            mimetype: thumbnail.mimetype,
            size: thumbnail.size,
          };
        } else if (updateData.thumbnail) {
          if (typeof updateData.thumbnail === "string") {
            updateData.thumbnail = {
              ...game.thumbnail,
              publicUrl: updateData.thumbnail,
            };
          }
        } else {
          updateData.thumbnail = game.thumbnail;
        }

        // Process boolean fields
        if (updateData.isFeatured) {
          updateData.isFeatured = updateData.isFeatured === "true";
        }
        if (updateData.isNew) {
          updateData.isNew = updateData.isNew === "true";
        }

        // Process numeric fields
        if (updateData.minPlayers) {
          updateData.minPlayers = parseInt(updateData.minPlayers);
        }
        if (updateData.maxPlayers) {
          updateData.maxPlayers = parseInt(updateData.maxPlayers);
        }

        updateData.updatedBy = context.user?.id;

        const updatedGame = await Game.findByIdAndUpdate(id, updateData, {
          new: true,
          session,
        }).select("-uploadPath -thumbnail.path -__v");

        return updatedGame;
      });

      return HttpResponse.send(context.res, result, 200);
    } catch (error) {
      throw error;
    }
  },

  deleteGame: async (context: RequestContext) => {
    try {
      const result = await context.withTransaction(async (session) => {
        const { id } = context.params;

        const game = await Game.findByIdAndDelete({ _id: id }).session(session);
        if (!game) {
          throw new NotFoundError("Game not found");
        }

        return {
          success: true,
          message: "Game deleted successfully",
          deletedId: id,
        };
      });

      return HttpResponse.send(context.res, result, 200);
    } catch (error) {
      throw error;
    }
  },
};
