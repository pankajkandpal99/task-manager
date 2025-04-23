import { Response } from "express";
export declare class ApiResponseService {
    static success(res: Response, data: any, message?: string, statusCode?: number): void;
    static error(res: Response, message?: string, statusCode?: number, errors?: any[]): void;
    static unauthorized(res: Response, message?: string): void;
    static forbidden(res: Response, message?: string): void;
}
