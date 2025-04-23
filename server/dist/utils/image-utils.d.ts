import { FileInfo } from "../types/file-upload-types";
export type ImageInput = FileInfo | string;
export declare const ImageUtils: {
    processImageUrls(images: ImageInput[]): string[];
    normalizeImageUrl(imageUrl: string): string;
};
