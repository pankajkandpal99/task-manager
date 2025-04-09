import {
  FileUploadConfigKey,
  getFileUploadConfig,
} from "../config/file-upload-config";
import { ApiHandlerOptions } from "./api-factory";

export function withFileUpload(
  options: Partial<ApiHandlerOptions> = {},
  configKey?: FileUploadConfigKey,
  multipartOptions?: {
    convertTextToJson?: boolean;
    validateBeforeAuth?: boolean;
  }
): ApiHandlerOptions {
  return {
    ...options,
    fileUpload: {
      enabled: true,
      convertTextToJson: multipartOptions?.convertTextToJson ?? true,
      validateBeforeAuth: multipartOptions?.validateBeforeAuth ?? false,
      options: getFileUploadConfig(configKey),
    },
  };
}
