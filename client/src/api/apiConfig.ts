import { API_BASE_URL } from "../config/config";

const API_ENDPOINTS = {
  AUTH: {
    REGISTER: `${API_BASE_URL}/auth/register`,
    LOGIN: `${API_BASE_URL}/auth/login`,
    LOGOUT: `${API_BASE_URL}/auth/logout`,
  },
  USER: {
    CURRENT_USER: `${API_BASE_URL}/users/me`,
    PROFILE: `${API_BASE_URL}/users/profile`,
    UPDATE_PROFILE: `${API_BASE_URL}/users/update`,
  },
  PROJECTS: {
    GET_ALL: `${API_BASE_URL}/projects/get-all`,
    CREATE: `${API_BASE_URL}/projects/create`,
    UPDATE: `${API_BASE_URL}/projects/update`,
    DELETE: `${API_BASE_URL}/projects/delete`,
    GET_BY_ID: `${API_BASE_URL}/projects/get-by-id`,
  },
  TASKS: {
    CREATE: `${API_BASE_URL}/tasks/create`,
    GET_ALL: `${API_BASE_URL}/tasks/get-all`,
    UPDATE: `${API_BASE_URL}/tasks/update`,
    DELETE: `${API_BASE_URL}/tasks/delete`,
    GET_BY_ID: `${API_BASE_URL}/tasks/get-by-id`,
    GET_BY_PROJECT: `${API_BASE_URL}/tasks/get-by-project`,
  },
};

export { API_ENDPOINTS };
