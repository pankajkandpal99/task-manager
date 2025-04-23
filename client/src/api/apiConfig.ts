import { API_BASE_URL } from "../config/config";

const API_ENDPOINTS = {
  AUTH: {
    REGISTER: `${API_BASE_URL}/api/v1/auth/register`,
    LOGIN: `${API_BASE_URL}/api/v1/auth/login`,
    LOGOUT: `${API_BASE_URL}/api/v1/auth/logout`,
  },
  USER: {
    CURRENT_USER: `${API_BASE_URL}/api/v1/users/me`,
    PROFILE: `${API_BASE_URL}/api/v1/users/profile`,
    UPDATE_PROFILE: `${API_BASE_URL}/api/v1/users/update`,
  },
  ADMIN: {
    HERO_SECTION: `${API_BASE_URL}/api/v1/admin/home/hero-section`,
    CATEGORY_GAMES: `${API_BASE_URL}/api/v1/admin/home/category-game-section`,
    UPLOAD_IMAGE: `${API_BASE_URL}/api/v1/upload-image`,
    GAME_SECTION: `${API_BASE_URL}/api/v1/admin/game`,
    GAME_LIST: `${API_BASE_URL}/api/v1/admin/games`,
  },
  GAME: {
    LIST: `${API_BASE_URL}/api/v1/games/list`,
    DETAILS: (gameId: string) => `${API_BASE_URL}/api/v1/games/${gameId}`,
  },
};

export { API_ENDPOINTS };
