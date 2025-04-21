import { FileUploadConfigKey } from "../config/file-upload-config";
import { ApiHandlerOptions } from "./api-factory";
export declare function withFileUpload(options?: Partial<ApiHandlerOptions>, configKey?: FileUploadConfigKey, multipartOptions?: {
    convertTextToJson?: boolean;
    validateBeforeAuth?: boolean;
    pathStructure?: string;
}): ApiHandlerOptions;
