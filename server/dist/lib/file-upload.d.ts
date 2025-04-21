import { Request } from "express";
import fs from "fs";
import { UploadOptions, UploadResult } from "../types/file-upload-types";
export declare const handleFileUpload: (req: Request, options?: Partial<UploadOptions>) => Promise<UploadResult>;
export declare const getFileStream: (filePath: string) => fs.ReadStream;
export declare const deleteFile: (filePath: string) => Promise<void>;
