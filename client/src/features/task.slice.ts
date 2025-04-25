import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../schema/projectSchema";
import { TasksState } from "../types/projectTypes";
import { TaskService } from "../services/task.service";

const initialState: TasksState = {
  tasksByProject: {},
  currentTask: null,
  loading: false,
  error: null,
};

export const fetchTasksByProject = createAsyncThunk<
  { projectId: string; tasks: Task[] },
  string
>("tasks/fetchByProject", async (projectId, { rejectWithValue }) => {
  try {
    const tasks = await TaskService.getTasksByProject(projectId);
    return { projectId, tasks };
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("Failed to fetch tasks");
  }
});

export const createTask = createAsyncThunk<
  { task: Task; projectId: string },
  { taskData: Omit<Task, "id">; projectId: string }
>("tasks/create", async ({ taskData, projectId }, { rejectWithValue }) => {
  try {
    const task = await TaskService.createTask(taskData, projectId);
    return { task, projectId };
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("Failed to create task");
  }
});

export const updateTask = createAsyncThunk<
  { task: Task; projectId: string },
  { taskData: Task; projectId: string }
>("tasks/update", async ({ taskData, projectId }, { rejectWithValue }) => {
  try {
    const task = await TaskService.updateTask(taskData, projectId);
    return { task, projectId };
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("Failed to update task");
  }
});

export const deleteTask = createAsyncThunk<
  { taskId: string; projectId: string },
  { taskId: string; projectId: string }
>("tasks/delete", async ({ taskId, projectId }, { rejectWithValue }) => {
  try {
    await TaskService.deleteTask(taskId, projectId);
    return { taskId, projectId };
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("Failed to delete task");
  }
});

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setCurrentTask: (state, action: PayloadAction<Task | null>) => {
      state.currentTask = action.payload;
    },
    clearTasksError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Task
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state) => {
        state.loading = false;
        state.currentTask = null;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update Task
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state) => {
        state.loading = false;
        state.currentTask = null;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Delete Task
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // get task by project
      .addCase(fetchTasksByProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasksByProject.fulfilled, (state, action) => {
        state.loading = false;
        const { projectId, tasks } = action.payload;
        state.tasksByProject[projectId] = tasks;
      })
      .addCase(fetchTasksByProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setCurrentTask, clearTasksError } = tasksSlice.actions;
export default tasksSlice.reducer;
