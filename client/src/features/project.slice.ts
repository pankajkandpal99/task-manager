import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Project } from "../schema/projectSchema";
import { ProjectsState } from "../types/projectTypes";
import { ProjectService } from "../services/project.service";

const initialState: ProjectsState = {
  projects: [],
  loading: false,
  error: null,
  currentProject: null,
};

export const fetchProjects = createAsyncThunk<Project[]>(
  "projects/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await ProjectService.getProjects();
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Failed to fetch projects");
    }
  }
);

export const createProject = createAsyncThunk<
  Project,
  Omit<Project, "id" | "tasks">
>("projects/create", async (projectData, { rejectWithValue }) => {
  try {
    return await ProjectService.createProject(projectData);
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("Failed to create project");
  }
});

export const updateProject = createAsyncThunk<Project, Project>(
  "projects/update",
  async (projectData, { rejectWithValue }) => {
    try {
      return await ProjectService.updateProject(projectData);
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Failed to update project");
    }
  }
);

export const removeProject = createAsyncThunk<string, string>(
  "projects/delete",
  async (projectId, { rejectWithValue }) => {
    try {
      await ProjectService.deleteProject(projectId);
      return projectId;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Failed to delete project");
    }
  }
);

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setCurrentProject: (state, action: PayloadAction<Project | null>) => {
      state.currentProject = action.payload;
    },
    clearProjectsError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Projects
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Create Project
      .addCase(createProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projects.push(action.payload);
      })
      .addCase(createProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update Project
      .addCase(updateProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.projects.findIndex(
          (p) => p._id === action.payload._id
        );
        if (index !== -1) {
          state.projects[index] = action.payload;
        }
        if (state.currentProject?._id === action.payload._id) {
          state.currentProject = action.payload;
        }
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Delete Project
      .addCase(removeProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = state.projects.filter((p) => p._id !== action.payload);
        if (state.currentProject?._id === action.payload) {
          state.currentProject = null;
        }
      })
      .addCase(removeProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setCurrentProject, clearProjectsError } = projectsSlice.actions;
export default projectsSlice.reducer;
