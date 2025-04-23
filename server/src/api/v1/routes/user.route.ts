import { Router } from "express";
import { createApiHandler } from "../../../utils/api-factory";
import { UserController } from "../controllers/user.controller";

export default (router: Router) => {
  router.get(
    "/users/me",
    createApiHandler(UserController.getCurrentUser, {
      useTransaction: true,
      requireAuth: true,
    })
  );
};
