import axios from "axios";
import { RegisterFormValues } from "../schema/authSchema";
import { API_ENDPOINTS } from "../api/apiConfig";

export const AuthService = {
  async register(data: RegisterFormValues) {
    try {
      const payload = {
        username: data.username,
        email: data.email,
        password: data.password,
        phone: data.phoneNumber,
      };

      const response = await axios.post(API_ENDPOINTS.AUTH.REGISTER, payload);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "Registration failed");
      }
      throw new Error("An unexpected error occurred");
    }
  },

  //   async login(data: LoginFormValues) {},
};
