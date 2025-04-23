import { Response } from "express";
export type Result<T, E = Error> = {
    success: true;
    data: T;
    code?: number;
} | {
    success: false;
    error: E;
    code?: number;
};
export declare const tryCatch: <T>(fn: () => Promise<T>, errorHandler?: (error: unknown) => Error) => Promise<Result<T>>;
export declare const handleResult: (res: Response) => <T>(result: Result<T>) => Promise<Response<{
    success: false;
    code: number;
    error: string;
    type?: string;
    details?: any;
    timestamp: string;
}, Record<string, any>> | Response<{
    success: true;
    code: number;
    data: T;
    timestamp: string;
}, Record<string, any>> | undefined>;
export declare const pipeAsync: (...fns: Function[]) => (x: any) => Promise<any>;
export declare const tapAsync: (fn: (x: any) => Promise<void> | void) => (x: any) => Promise<any>;
