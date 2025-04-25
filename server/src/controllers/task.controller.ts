import { NotFoundError } from "@utils/notFoundError";
import { Request, Response } from "express";
import mongoose from "mongoose";
import { ProjectModel } from "src/model/project.model";
import { TaskModel } from "src/model/task.model";

export const createTask = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;
    const taskData = req.body;

    if (!projectId) {
      return res.status(400).json({ error: "Project ID is required" });
    }

    const newTask = await TaskModel.create({
      ...taskData,
      projectId,
      userId: req.user?.userId,
    });

    const project = await ProjectModel.findOneAndUpdate(
      { _id: projectId, userId: req.user?.userId },
      { $push: { tasks: newTask._id } },
      { new: true }
    );

    if (!project) {
      await TaskModel.findByIdAndDelete(newTask._id);
      throw new NotFoundError("Project not found");
    }

    return res.status(201).json(newTask.toObject());
  } catch (error: any) {
    return res.status(error.statusCode || 500).json({
      error: error.message || "Failed to create task",
    });
  }
};

export const getTasks = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;

    if (!projectId) {
      return res.status(400).json({ error: "Project ID is required" });
    }

    const project = await ProjectModel.findOne({
      _id: projectId,
      userId: req.user?.userId,
    });

    if (!project) throw new NotFoundError("Project not found");

    const tasks = await TaskModel.find({
      projectId,
      userId: req.user?.userId,
    }).lean();

    return res.json(
      tasks.map((task) => ({
        ...task,
        id: task._id.toString(),
      }))
    );
  } catch (error: any) {
    return res.status(error.statusCode || 500).json({
      error: error.message || "Failed to fetch tasks",
    });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { projectId, taskId } = req.params;
    const taskData = req.body;

    console.log("req.body", req.body);
    console.log("req.params", req.params);

    if (!projectId || !taskId) {
      return res
        .status(400)
        .json({ error: "Project ID and Task ID are required" });
    }

    const task = await TaskModel.findOneAndUpdate(
      {
        _id: taskId,
        projectId,
        userId: req.user?.userId,
      },
      taskData,
      { new: true }
    );

    if (!task) throw new NotFoundError("Task not found");

    return res.json({
      ...task.toObject(),
      id: task._id.toString(),
    });
  } catch (error: any) {
    return res.status(error.statusCode || 500).json({
      error: error.message || "Failed to update task",
    });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { projectId, taskId } = req.params;

    if (!projectId || !taskId) {
      return res
        .status(400)
        .json({ error: "Project ID and Task ID are required" });
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // First delete the task
      const task = await TaskModel.findOneAndDelete({
        _id: taskId,
        projectId,
        userId: req.user?.userId,
      }).session(session);

      if (!task) {
        throw new NotFoundError("Task not found");
      }

      await ProjectModel.findByIdAndUpdate(
        projectId,
        { $pull: { tasks: taskId } },
        { session }
      );

      await session.commitTransaction();
      return res.json({ message: "Task deleted successfully" });
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  } catch (error: any) {
    return res.status(error.statusCode || 500).json({
      error: error.message || "Failed to delete task",
    });
  }
};

export const getTaskById = async (req: Request, res: Response) => {
  try {
    const { projectId, taskId } = req.params;

    if (!projectId || !taskId) {
      return res
        .status(400)
        .json({ error: "Project ID and Task ID are required" });
    }

    const task = await TaskModel.findOne({
      _id: taskId,
      projectId,
      userId: req.user?.userId,
    }).lean();

    if (!task) throw new NotFoundError("Task not found");

    return res.json({
      ...task,
      id: task._id.toString(),
    });
  } catch (error: any) {
    return res.status(error.statusCode || 500).json({
      error: error.message || "Failed to fetch task",
    });
  }
};

export const getTasksByProject = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;

    if (!projectId) {
      return res.status(400).json({ error: "Project ID is required" });
    }

    const tasks = await TaskModel.find({
      projectId,
      userId: req.user?.userId,
    })
      .sort({ created: -1 })
      .lean();

    return res.json(
      tasks.map((task) => ({
        ...task,
        id: task._id.toString(),
      }))
    );
  } catch (error: any) {
    return res.status(error.statusCode || 500).json({
      error: error.message || "Failed to fetch tasks",
    });
  }
};
