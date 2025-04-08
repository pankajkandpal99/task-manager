import {
  FileUploadConfigKey,
  getFileUploadConfig,
} from "../config/file-upload-config";
import { ApiHandlerOptions } from "./api-factory";

export function withFileUpload(
  options: Partial<ApiHandlerOptions> = {},
  configKey?: FileUploadConfigKey
): ApiHandlerOptions {
  return {
    ...options,
    fileUpload: {
      enabled: true,
      options: getFileUploadConfig(configKey),
    },
  };
}
