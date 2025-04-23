import { AppError } from "./app-error";
export declare class ValidationError extends AppError {
    constructor(message?: string, details?: any);
}
export declare class AuthenticationError extends AppError {
    constructor(message?: string, details?: any);
}
export declare class NotFoundError extends AppError {
    constructor(message?: string, details?: any);
}
export declare class ConflictError extends AppError {
    constructor(message?: string, details?: any);
}
