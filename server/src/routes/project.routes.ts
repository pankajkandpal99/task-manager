import { Router } from "express";
import {
  createProject,
  deleteProject,
  getProjectById,
  getProjects,
  updateProject,
} from "src/controllers/project.controller";
import authMiddleware from "src/middlewares/auth.middleware";

const router = Router();

router.post("/create", authMiddleware, createProject);
router.get("/get-all", authMiddleware, getProjects);
router.put("/update/:id", authMiddleware, updateProject);
router.get("/get-by-id/:id", authMiddleware, getProjectById);
router.delete("/delete/:id", authMiddleware, deleteProject);

export default router;
