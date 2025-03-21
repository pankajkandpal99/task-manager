const API_BASE_URL = import.meta.env.VITE_MY_BACKEND_URL;

const API_ENDPOINTS = {
  AUTH: {
    REGISTER: `${API_BASE_URL}/auth/register`,
    LOGIN: `${API_BASE_URL}/auth/login`,
    LOGOUT: `${API_BASE_URL}/auth/logout`,
  },
  USERS: {
    PROFILE: `${API_BASE_URL}/users/profile`,
    UPDATE_PROFILE: `${API_BASE_URL}/users/update`,
  },
  GAMES: {
    LIST: `${API_BASE_URL}/games/list`,
    DETAILS: (gameId: string) => `${API_BASE_URL}/games/${gameId}`,
  },
};

export { API_BASE_URL, API_ENDPOINTS };
