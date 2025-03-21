export enum StatusCodes {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500,
}

export const ROLES = {
  USER: "user",
  ADMIN: "admin",
  SUPER_ADMIN: "super_admin",
};

export const ERROR_MESSAGES = {
  INVALID_CREDENTIALS: "Invalid credentials",
  UNAUTHORIZED_ACCESS: "Unauthorized access",
  RESOURCE_NOT_FOUND: "Resource not found",
  DUPLICATE_ENTRY: "Duplicate entry found",
};

export const CONFIG = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
  PASSWORD_MIN_LENGTH: 8,
  JWT_COOKIE_NAME: "authToken",
};
