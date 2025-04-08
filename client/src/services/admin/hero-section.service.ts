/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_ENDPOINTS } from "../../api/apiConfig";
import { HeroSectionFormValues } from "../../schema/admin/HeroSectionSchema";
import axiosInstance from "../../utils/axiosConfig";

export const HeroSectionService = {
  async postHeroSection(data: HeroSectionFormValues): Promise<any> {
    try {
      // console.log("Received Data:", data);
      const formData = new FormData();

      // Append form fields except images
      Object.keys(data).forEach((key) => {
        if (key !== "backgroundImages") {
          formData.append(key, (data as any)[key]);
        }
      });

      // Append image files
      data.backgroundImages.forEach((image) => {
        if (image instanceof File) {
          formData.append("backgroundImages", image);
        } else if (typeof image === "string") {
          formData.append("existingImages", image);
        }
      });

      // const formDataEntries = Array.from(formData.entries());
      // console.log("Final FormData:", formDataEntries);

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
      const response = await axiosInstance.get(
        API_ENDPOINTS.ADMIN.HERO_SECTION
      );
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
