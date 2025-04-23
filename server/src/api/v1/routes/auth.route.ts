import { Router } from "express";
import { loginSchema, registerSchema } from "../../../schema/authSchema";
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

  router.post(
    "/auth/login",
    createApiHandler(AuthController.login, {
      bodySchema: loginSchema,
      useTransaction: true,
      requireAuth: false,
    })
  );
};
