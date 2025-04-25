import { Router } from "express";
import {
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  getTasksByProject,
  updateTask,
} from "src/controllers/task.controller";
import authMiddleware from "src/middlewares/auth.middleware";

const router = Router();

router.post("/create/:projectId", authMiddleware, createTask);
router.get("/get-all/:projectId", authMiddleware, getTasks);
router.get("/get-by-id/:projectId/:taskId", authMiddleware, getTaskById);
router.get("/get-by-project/:projectId", authMiddleware, getTasksByProject);
router.put("/update/:projectId/:taskId", authMiddleware, updateTask);
router.delete("/delete/:projectId/:taskId", authMiddleware, deleteTask);

export default router;
