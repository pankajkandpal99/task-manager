import axios from "axios";
import { API_BASE_URL } from "../api/apiConfig";
import {
  checkAuthCookie,
  clearAuthCookie,
  getTokenFromCookie,
  verifyTokenClientSide,
} from "./authUtils";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (checkAuthCookie() && verifyTokenClientSide()) {
      const token = getTokenFromCookie();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access (logout the user)
      clearAuthCookie(); // clear the auth cookie
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
