import { Router } from "express";
import { registerSchema } from "../../../schema/authSchema";
import { createApiHandler } from "../../../utils/api-factory";
import { requireAuth } from "../../../middleware/auth";
import { registerUser } from "../controllers/auth.controller";

export default (router: Router) => {
  router.post(
    "/auth/register",
    createApiHandler(registerUser, {
      bodySchema: registerSchema,
      auditLog: false,
      useTransaction: true,
    })
  );

  // router.get(
  //   "/users/profile",
  //   createApiHandler(getUserProfile, {
  //     requireAuth: true,
  //   })
  // );
};
