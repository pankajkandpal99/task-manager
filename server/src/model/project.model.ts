import { IProject } from "@interfaces/project.interface";
import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema<IProject>(
  {
    name: { type: String, required: true, minlength: 3 },
    progress: { type: Number, default: 0, min: 0, max: 100 },
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const ProjectModel = mongoose.model<IProject>("Project", ProjectSchema);
