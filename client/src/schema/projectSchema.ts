import { z } from "zod";

export const priorityEnum = z.enum(["Low", "Medium", "High"]);
export const statusEnum = z.enum(["Pending", "In Progress", "Completed"]);

export const taskSchema = z.object({
  _id: z.string().optional(),
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  status: statusEnum,
  priority: priorityEnum,
  created: z.string().default(new Date().toISOString()),
  due: z.string().min(1, "Due date is required"),
  completed: z.string().optional(),
});

export const projectSchema = z.object({
  _id: z.string().optional(),
  name: z.string().min(3, "Project name must be at least 3 characters"),
  progress: z.number().min(0).max(100).default(0),
  tasks: z.array(taskSchema).default([]),
});

export type Task = z.infer<typeof taskSchema>;
export type Project = z.infer<typeof projectSchema>;
