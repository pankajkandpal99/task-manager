import mongoose from "mongoose";
import { ITask } from "@interfaces/project.interface";

const TaskSchema = new mongoose.Schema<ITask>({
  title: { type: String, required: true, minlength: 3 },
  description: { type: String, required: true, minlength: 10 },
  status: {
    type: String,
    required: true,
    enum: ["Pending", "In Progress", "Completed"],
    default: "Pending",
  },
  priority: {
    type: String,
    required: true,
    enum: ["Low", "Medium", "High"],
    default: "Medium",
  },
  created: { type: String, default: new Date().toISOString() },
  due: { type: String, required: true },
  completed: { type: String },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export { TaskSchema };

export const TaskModel = mongoose.model<ITask>("Task", TaskSchema);
