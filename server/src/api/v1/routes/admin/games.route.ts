import { Router } from "express";
import { createApiHandler } from "../../../../utils/api-factory";
import { GameSectionController } from "../../controllers/admin/game.controller";
import { withFileUpload } from "../../../../utils/file-upload-utils";

export default (router: Router) => {
  router.post(
    "/admin/games",
    createApiHandler(
      GameSectionController.createOrUpdateGameSection,
      withFileUpload(
        {
          requireAuth: true,
          requireAdmin: true,
          useTransaction: true,
          bodySchema: undefined,
        },
        "game-thumbnail",
        {
          convertTextToJson: true,
          validateBeforeAuth: false,
          pathStructure: "games",
        }
      )
    )
  );

  router.get(
    "/admin/games",
    createApiHandler(GameSectionController.getAllGames, {
      useTransaction: true,
      requireAuth: false,
    })
  );
};
