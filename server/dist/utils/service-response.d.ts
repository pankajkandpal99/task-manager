import { Response } from "express";
type SuccessResponse<T> = {
    success: true;
    code: number;
    data: T;
    timestamp: string;
};
type ErrorResponse = {
    success: false;
    code: number;
    error: string;
    type?: string;
    details?: any;
    timestamp: string;
};
export declare class HttpResponse {
    static send<T>(res: Response, data: T, code?: number): Response<SuccessResponse<T>>;
    static error(res: Response, message: string, code?: number, options?: {
        type?: string;
        details?: any;
        exposeStack?: boolean;
    }): Response<ErrorResponse>;
    static handleResult<T>(res: Response, result: T | Error, successCode?: number): void;
}
export {};
