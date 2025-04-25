import { Router } from "express";
import { getUserController } from "src/controllers/user.controller";
import authMiddleware from "src/middlewares/auth.middleware";

const router = Router();

router.get("/me", authMiddleware, getUserController);

export default router;
