/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_ENDPOINTS } from "../../api/apiConfig";
import { HeroSectionFormValues } from "../../schema/admin/HeroSectionSchema";
import axiosInstance from "../../utils/axiosConfig";
import { apiClient } from "../auth.service";

export const HeroSectionService = {
  async postHeroSection(data: HeroSectionFormValues): Promise<any> {
    try {
      const formData = new FormData();

      Object.keys(data).forEach((key) => {
        if (key !== "backgroundImages") {
          const value = (data as any)[key];

          // If the value is an array or object, stringify it first
          if (
            typeof value === "object" &&
            value !== null &&
            !(value instanceof File)
          ) {
            formData.append(key, JSON.stringify(value));
          } else {
            formData.append(key, value);
          }
        }
      });

      data.backgroundImages.forEach((image) => {
        if (image instanceof File) {
          formData.append("backgroundImages", image);
        } else if (typeof image === "string") {
          formData.append("existingImages", image);
        }
      });

      // console.log("FormData:", formData); // Debugging line
      // console.log("FormData keys:", Array.from(formData.keys())); // Debugging line

      const response = await axiosInstance.post(
        API_ENDPOINTS.ADMIN.HERO_SECTION,
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

  async getHeroSection(): Promise<any> {
    try {
      const response = await apiClient.get(API_ENDPOINTS.ADMIN.HERO_SECTION);

      return response.data;
    } catch (error: any) {
      if (error.response) {
        const serverError = error.response.data;
        throw new Error(
          serverError.message || "Failed to fetch hero section content"
        );
      }
      throw new Error("Network error occurred. Please try again.");
    }
  },
};
