import { Router } from "express";
import { loginSchema, registerSchema } from "src/schema/auth.schema";
import { login, register } from "src/controllers/auth.controller";
import { validate } from "src/middlewares/validation.middleware";

const router = Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);

export default router;
