export declare class AppError extends Error {
    message: string;
    statusCode: number;
    type?: string | undefined;
    details?: any | undefined;
    constructor(message: string, statusCode?: number, type?: string | undefined, details?: any | undefined);
}
