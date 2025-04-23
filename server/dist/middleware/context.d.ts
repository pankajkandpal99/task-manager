import mongoose, { ClientSession, Document, Model } from "mongoose";
import { Request, Response, RequestHandler } from "express";
import { FileInfo } from "../types/file-upload-types";
import { ROLE } from "../config/constants";
export declare class RequestContext {
    db: mongoose.Connection;
    req: Request;
    res: Response;
    private _params;
    body: any;
    user?: {
        id: string;
        email: string;
        role: ROLE;
    };
    private _session?;
    files?: FileInfo[];
    imageVariants?: FileInfo[];
    query?: {
        [key: string]: string | undefined;
    };
    constructor(db: mongoose.Connection, req: Request, res: Response);
    get params(): Record<string, any>;
    set params(value: Record<string, any>);
    get session(): ClientSession | undefined;
    withTransaction<T>(callback: (session: ClientSession) => Promise<T>): Promise<T>;
    runQuery<T extends Document>(model: Model<T>, query: (model: Model<T>, session?: ClientSession) => Promise<T | T[] | null>): Promise<T | T[] | null>;
}
export declare const contextMiddleware: (db: mongoose.Connection) => RequestHandler;
