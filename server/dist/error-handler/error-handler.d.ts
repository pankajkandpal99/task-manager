import { Request, Response, NextFunction } from "express";
export declare const errorHandler: (err: unknown, req: Request, res: Response, next: NextFunction) => Response<{
    success: false;
    code: number;
    error: string;
    type?: string;
    details?: any;
    timestamp: string;
}, Record<string, any>>;
