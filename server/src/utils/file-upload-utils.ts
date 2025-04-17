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
    pathStructure?: string;
  }
): ApiHandlerOptions {
  return {
    ...options,
    fileUpload: {
      enabled: true,
      convertTextToJson: multipartOptions?.convertTextToJson ?? true,
      validateBeforeAuth: multipartOptions?.validateBeforeAuth ?? false,
      options: {
        ...getFileUploadConfig(configKey),
        pathStructure: multipartOptions?.pathStructure,
        preservePath: true,
      },
    },
  };
}
