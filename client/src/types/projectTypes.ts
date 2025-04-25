import { Project, Task } from "../schema/projectSchema";

export interface ProjectsState {
  projects: Project[];
  loading: boolean;
  error: string | null;
  currentProject: Project | null;
}

export interface TasksState {
  tasksByProject: Record<string, Task[]>;
  currentTask: Task | null;
  loading: boolean;
  error: string | null;
}
