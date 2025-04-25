import { NotFoundError } from "@utils/notFoundError";
import { Request, Response } from "express";
import mongoose from "mongoose";
import { ProjectModel } from "src/model/project.model";
import { TaskModel } from "src/model/task.model";

export const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await ProjectModel.find({
      userId: req.user?.userId,
    }).lean();

    res.json(
      projects.map((project) => ({
        ...project,
        id: project._id.toString(),
        tasks: project.tasks?.map((taskId) => taskId.toString()) || [],
      }))
    );
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch projects" });
  }
};

export const createProject = async (req: Request, res: Response) => {
  try {
    console.log("enter");
    const { name } = req.body;
    const project = new ProjectModel({
      name,
      userId: req.user?.userId,
    });

    await project.save();
    res.status(201).json({
      ...project.toObject(),
      id: project._id.toString(),
      tasks: [],
    });
  } catch (error) {
    res.status(400).json({ error: error || "Failed to create project" });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, progress } = req.body;

    const project = await ProjectModel.findOneAndUpdate(
      { _id: id, userId: req.user?.userId },
      { name, progress },
      { new: true }
    ).populate("tasks");

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    return res.json({
      ...project.toObject(),
      id: project._id.toString(),
      tasks: project.tasks?.map((task) => ({
        ...task,
        id: task._id.toString(),
      })),
    });
  } catch (error) {
    return res.status(400).json({ error: "Failed to update project" });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      await TaskModel.deleteMany({
        projectId: id,
        userId: req.user?.userId,
      }).session(session);

      const project = await ProjectModel.findOneAndDelete({
        _id: id,
        userId: req.user?.userId,
      }).session(session);

      if (!project) {
        throw new NotFoundError("Project not found");
      }

      await session.commitTransaction();
      return res.json({ message: "Project deleted successfully" });
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  } catch (error: any) {
    return res.status(error.statusCode || 500).json({
      error: error.message || "Failed to delete project",
    });
  }
};

export const getProjectById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const project = await ProjectModel.findOne({
      _id: id,
      userId: req.user?.userId,
    })
      .populate({
        path: "tasks",
        select: "-__v",
        options: { sort: { created: -1 } },
      })
      .lean();
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    return res.json({
      ...project,
      id: project._id.toString(),
      tasks: project.tasks?.map((task) => ({
        ...task,
        id: task._id.toString(),
      })),
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch project" });
  }
};

// import { Request, Response } from "express";
// import { ProjectModel } from "src/model/project.model";

// export const getProjects = async (req: Request, res: Response) => {
//   try {
//     const projects = await ProjectModel.find({ userId: req.user?.userId });
//     res.json(projects);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch projects" });
//   }
// };

// export const createProject = async (req: Request, res: Response) => {
//   try {
//     const { name } = req.body;
//     const project = new ProjectModel({
//       name,
//       userId: req.user?.userId,
//     });

//     await project.save();
//     res.status(201).json(project);
//   } catch (error) {
//     res.status(400).json({ error: "Failed to create project" });
//   }
// };

// export const updateProject = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const { name, progress } = req.body;

//     const project = await ProjectModel.findOneAndUpdate(
//       { _id: id, userId: req.user?.userId },
//       { name, progress },
//       { new: true }
//     );

//     if (!project) {
//       return res.status(404).json({ error: "Project not found" });
//     }

//     return res.json(project);
//   } catch (error) {
//     return res.status(400).json({ error: "Failed to update project" });
//   }
// };

// export const deleteProject = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const project = await ProjectModel.findOneAndDelete({
//       _id: id,
//       userId: req.user?.userId,
//     });

//     if (!project) {
//       return res.status(404).json({ error: "Project not found" });
//     }

//     return res.json({ message: "Project deleted successfully" });
//   } catch (error) {
//     return res.status(400).json({ error: "Failed to delete project" });
//   }
// };

// export const getProjectById = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const project = await ProjectModel.findOne({
//       _id: id,
//       userId: req.user?.userId,
//     });

//     if (!project) {
//       return res.status(404).json({ error: "Project not found" });
//     }

//     return res.json(project);
//   } catch (error) {
//     return res.status(500).json({ error: "Failed to fetch project" });
//   }
// };
