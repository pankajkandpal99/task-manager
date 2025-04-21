import { FileInfo } from "../types/file-upload-types";
export interface ImageSize {
    width: number;
    height?: number;
    suffix: string;
    quality?: number;
}
export interface ImageProcessingOptions {
    sizes?: ImageSize[];
    optimizeOriginal?: boolean;
    deleteOriginal?: boolean;
    outputFormat?: "jpeg" | "png" | "webp";
    outputQuality?: number;
}
export declare const processImage: (fileInfo: FileInfo, options?: ImageProcessingOptions) => Promise<{
    original: FileInfo;
    variants: FileInfo[];
}>;
export declare const processMultipleImages: (files: FileInfo[], options?: ImageProcessingOptions) => Promise<{
    originals: FileInfo[];
    variants: FileInfo[];
}>;
