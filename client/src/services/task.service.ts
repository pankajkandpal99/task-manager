/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_ENDPOINTS } from "../api/apiConfig";
import { Task } from "../schema/projectSchema";
import axiosInstance from "../utils/axiosConfig";

export const TaskService = {
  async createTask(data: Omit<Task, "id">, projectId: string): Promise<Task> {
    try {
      const payload = {
        title: data.title,
        description: data.description,
        status: data.status,
        priority: data.priority,
        due: data.due,
      };

      const response = await axiosInstance.post(
        `${API_ENDPOINTS.TASKS.CREATE}/${projectId}`,
        payload
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        const serverError = error.response.data;
        throw new Error(serverError.error || "Failed to create task");
      }
      throw new Error("Network error occurred. Please try again.");
    }
  },

  async updateTask(data: Task, projectId: string): Promise<Task> {
    try {
      console.log("data id ", data._id);
      console.log("projectId", projectId);

      const payload = {
        title: data.title,
        description: data.description,
        status: data.status,
        priority: data.priority,
        due: data.due,
        completed: data.completed,
      };

      const response = await axiosInstance.put(
        `${API_ENDPOINTS.TASKS.UPDATE}/${projectId}/${data._id}`,
        payload
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        const serverError = error.response.data;
        throw new Error(serverError.error || "Failed to update task");
      }
      throw new Error("Network error occurred. Please try again.");
    }
  },

  async deleteTask(taskId: string, projectId: string): Promise<void> {
    try {
      await axiosInstance.delete(
        `${API_ENDPOINTS.TASKS.DELETE}/${projectId}/${taskId}`
      );
    } catch (error: any) {
      if (error.response) {
        const serverError = error.response.data;
        throw new Error(serverError.error || "Failed to delete task");
      }
      throw new Error("Network error occurred. Please try again.");
    }
  },

  async getTasksByProject(projectId: string): Promise<Task[]> {
    try {
      const response = await axiosInstance.get(
        `${API_ENDPOINTS.TASKS.GET_BY_PROJECT}/${projectId}`
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        const serverError = error.response.data;
        throw new Error(serverError.error || "Failed to fetch tasks");
      }
      throw new Error("Network error occurred. Please try again.");
    }
  },
};
