import { Request, Response, NextFunction } from "express";
export declare const requireAuth: (req: Request & {
    context: {
        user: any;
    };
}, res: Response, next: NextFunction) => void;
