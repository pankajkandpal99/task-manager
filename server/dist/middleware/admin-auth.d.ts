import { NextFunction, Request, Response } from "express";
export declare const requireAdmin: (req: Request & {
    context: {
        user: any;
    };
}, res: Response, next: NextFunction) => void;
