export declare enum StatusCodes {
    OK = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    CONFLICT = 409,
    INTERNAL_SERVER_ERROR = 500
}
export declare enum ROLE {
    USER = "USER",
    ADMIN = "ADMIN",
    GUEST = "GUEST",
    SUPER_ADMIN = "SUPER_ADMIN"
}
export declare const ERROR_MESSAGES: {
    INVALID_CREDENTIALS: string;
    UNAUTHORIZED_ACCESS: string;
    RESOURCE_NOT_FOUND: string;
    DUPLICATE_ENTRY: string;
};
export declare const CONFIG: {
    DEFAULT_PAGE_SIZE: number;
    MAX_PAGE_SIZE: number;
    PASSWORD_MIN_LENGTH: number;
    JWT_COOKIE_NAME: string;
};
