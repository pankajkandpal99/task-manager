import axios from "axios";
import { LoginFormValues, RegisterFormValues } from "../schema/authSchema";
import { API_ENDPOINTS } from "../api/apiConfig";
import { API_BASE_URL } from "../config/config";

export const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const AuthService = {
  async register(data: RegisterFormValues) {
    try {
      const payload = {
        name: data.name,
        email: data.email,
        country: data.country,
        password: data.password,
        confirmPassword: data.confirmPassword,
      };

      const response = await apiClient.post(
        API_ENDPOINTS.AUTH.REGISTER,
        payload
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const serverError = error.response.data;
        throw new Error(serverError.error || "Registration failed");
      }
      throw new Error("Network error occurred. Please try again.");
    }
  },

  async login(data: LoginFormValues) {
    try {
      const payload = {
        email: data.email,
        password: data.password,
      };

      const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, payload);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const serverError = error.response.data;
        throw new Error(serverError.error || "Login failed");
      }
      throw new Error("Network error occurred. Please try again.");
    }
  },
};
