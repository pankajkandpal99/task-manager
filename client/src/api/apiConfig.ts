const API_BASE_URL = import.meta.env.VITE_MY_BACKEND_URL;

const API_ENDPOINTS = {
  AUTH: {
    REGISTER: `${API_BASE_URL}/api/v1/auth/register`,
    LOGIN: `${API_BASE_URL}/api/v1/auth/login`,
    LOGOUT: `${API_BASE_URL}/api/v1/auth/logout`,
  },
  USERS: {
    PROFILE: `${API_BASE_URL}/api/v1/users/profile`,
    UPDATE_PROFILE: `${API_BASE_URL}/api/v1/users/update`,
  },
  GAMES: {
    LIST: `${API_BASE_URL}/api/v1/games/list`,
    DETAILS: (gameId: string) => `${API_BASE_URL}/api/v1/games/${gameId}`,
  },
};

export { API_BASE_URL, API_ENDPOINTS };
