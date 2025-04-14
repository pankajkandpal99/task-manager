/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_ENDPOINTS } from "../../api/apiConfig";
import { CategoryGamesFormValues } from "../../schema/admin/CategoryGamesSchema";
import axiosInstance from "../../utils/axiosConfig";
import { apiClient } from "../auth.service";

export const CategoryGameService = {
  async postCategoryGames(data: CategoryGamesFormValues): Promise<any> {
    try {
      console.log("category game service file...", data);
      const formData = new FormData();

      // Append all fields except games (we'll handle that separately)
      Object.keys(data).forEach((key) => {
        if (key !== "games") {
          const value = (data as any)[key];

          // Handle arrays and objects by stringifying them
          if (typeof value === "object" && value !== null) {
            formData.append(key, JSON.stringify(value));
          } else {
            formData.append(key, value);
          }
        }
      });

      if (data.games && Array.isArray(data.games)) {
        formData.append("games", JSON.stringify(data.games));
      }

      const response = await axiosInstance.post(
        API_ENDPOINTS.ADMIN.CATEGORY_GAMES,
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
        throw new Error(
          serverError.message || "Failed to save hero section content"
        );
      }
      throw new Error("Network error occurred. Please try again.");
    }
  },

  async getCategoryGames(): Promise<any> {
    try {
      const response = await apiClient.get(API_ENDPOINTS.ADMIN.CATEGORY_GAMES);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        const serverError = error.response.data;
        throw new Error(
          serverError.message || "Failed to fetch category games"
        );
      }
      throw new Error("Network error occurred. Please try again.");
    }
  },
};
