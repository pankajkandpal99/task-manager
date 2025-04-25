import mongoose from "mongoose";
import { Project, Task } from "src/schema/project.schema";

export interface ITask extends Task, Document {
  _id: string;
  title: string;
  description: string;
  status: "Pending" | "In Progress" | "Completed";
  priority: "Low" | "Medium" | "High";
  created: string;
  due: string;
  completed?: string;
  userId: mongoose.Types.ObjectId | string;
  projectId: mongoose.Types.ObjectId | string;
}

export interface IProject extends Project, Document {
  _id: string;
  name: string;
  progress: number;
  tasks: ITask[];
  userId: mongoose.Types.ObjectId | string;
  createdAt?: Date;
  updatedAt?: Date;
}
