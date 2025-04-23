import { NextFunction, Request, Response } from "express";
export declare const paramExtractorMiddleware: () => (req: Request, res: Response, next: NextFunction) => void;
