import { EnhancedUploadOptions } from "../hooks/file-upload-hook";
export type BaseFileUploadConfigKey = "hero-section-image" | "profile-image" | "product-image" | "gallery-image" | "game-image" | "game-thumbnail" | "game-screenshot" | "default";
export type FileUploadConfigKey = BaseFileUploadConfigKey | (string & {});
export declare const fileUploadConfigs: Record<FileUploadConfigKey, Partial<EnhancedUploadOptions>>;
export declare function getFileUploadConfig(configKey?: FileUploadConfigKey | FileUploadConfigKey[]): Partial<EnhancedUploadOptions>;
