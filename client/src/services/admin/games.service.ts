/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_ENDPOINTS } from "../../api/apiConfig";
import { GameFormValues } from "../../schema/admin/GameSchema";
import axiosInstance from "../../utils/axiosConfig";
import { apiClient } from "../auth.service";

export const GameService = {
  async createGame(gameData: GameFormValues) {
    try {
      const formData = new FormData();

      Object.entries(gameData).forEach(([key, value]) => {
        if (key === "thumbnail" && value instanceof File) {
          formData.append("thumbnail", value);
        } else {
          formData.append(key, String(value));
        }
      });

      const response = await axiosInstance.post(
        API_ENDPOINTS.ADMIN.GAME_LIST,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      return response.data;
    } catch (error: any) {
      if (error.response) {
        const serverError = error.response.data;
        throw new Error(serverError.error || "Failed to create game");
      }
      throw new Error("Network error occurred. Please try again.");
    }
  },

  async getAllGames() {
    try {
      const response = await apiClient.get(API_ENDPOINTS.ADMIN.GAME_LIST);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        const serverError = error.response.data;
        throw new Error(serverError.error || "Failed to fetch games");
      }
      throw new Error("Network error occurred. Please try again.");
    }
  },

  async updateGame(gameId: string, gameData: GameFormValues) {
    try {
      const formData = new FormData();

      Object.entries(gameData).forEach(([key, value]) => {
        if (key === "thumbnail" && value instanceof File) {
          formData.append("thumbnail", value);
        } else if (value !== undefined) {
          formData.append(key, String(value));
        }
      });

      const response = await axiosInstance.put(
        `${API_ENDPOINTS.ADMIN.GAME_LIST}/${gameId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (error: any) {
      if (error.response) {
        const serverError = error.response.data;
        throw new Error(serverError.error || "Failed to update game");
      }
      throw new Error("Network error occurred. Please try again.");
    }
  },

  async deleteGame(gameId: string) {
    try {
      const response = await axiosInstance.delete(
        `${API_ENDPOINTS.ADMIN.GAME_LIST}/${gameId}`
      );

      console.log("deleted game : ", response.data);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        const serverError = error.response.data;
        throw new Error(serverError.error || "Failed to delete game");
      }
      throw new Error("Network error occurred. Please try again.");
    }
  },
};
