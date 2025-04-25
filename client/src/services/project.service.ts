/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_ENDPOINTS } from "../api/apiConfig";
import { Project } from "../schema/projectSchema";
import axiosInstance from "../utils/axiosConfig";

export const ProjectService = {
  async getProjects(): Promise<Project[]> {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.PROJECTS.GET_ALL);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        const serverError = error.response.data;
        throw new Error(serverError.error || "Failed to fetch projects");
      }
      throw new Error("Network error occurred. Please try again.");
    }
  },

  async createProject(data: Omit<Project, "id" | "tasks">): Promise<Project> {
    try {
      const payload = {
        name: data.name,
      };

      const response = await axiosInstance.post(
        API_ENDPOINTS.PROJECTS.CREATE,
        payload
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        const serverError = error.response.data;
        throw new Error(serverError.error || "Failed to create project");
      }
      throw new Error("Network error occurred. Please try again.");
    }
  },

  async updateProject(data: Project): Promise<Project> {
    try {
      if (!data._id) {
        throw new Error("Project ID is required for update");
      }

      const payload = {
        name: data.name,
        progress: data.progress,
      };

      const response = await axiosInstance.put(
        `${API_ENDPOINTS.PROJECTS.UPDATE}/${data._id}`,
        payload
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        const serverError = error.response.data;
        throw new Error(serverError.error || "Failed to update project");
      }
      throw new Error("Network error occurred. Please try again.");
    }
  },

  async deleteProject(projectId: string): Promise<void> {
    try {
      if (!projectId) {
        throw new Error("Project ID is required for deletion");
      }

      await axiosInstance.delete(
        `${API_ENDPOINTS.PROJECTS.DELETE}/${projectId}`
      );
    } catch (error: any) {
      if (error.response) {
        const serverError = error.response.data;
        throw new Error(serverError.error || "Failed to delete project");
      }
      throw new Error("Network error occurred. Please try again.");
    }
  },
};
