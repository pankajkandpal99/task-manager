import { Router } from "express";
import { registerSchema } from "../../../schema/authSchema";
import { createApiHandler } from "../../../utils/api-factory";
import { AuthController } from "../controllers/auth.controller";

export default (router: Router) => {
  router.post(
    "/auth/register",
    createApiHandler(AuthController.register, {
      bodySchema: registerSchema,
      useTransaction: true,
      requireAuth: false,
    })
  );

  // router.get(
  //   "/users/profile",
  //   createApiHandler(getUserProfile, {
  //     requireAuth: true,
  //   })
  // );
};
