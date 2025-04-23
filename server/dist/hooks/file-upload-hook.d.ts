import { RequestContext } from "../middleware/context";
import { ImageProcessingOptions } from "../services/image-processing.service";
import { UploadOptions } from "../types/file-upload-types";
export interface EnhancedUploadOptions extends UploadOptions {
    processImages?: boolean;
    imageProcessingOptions?: ImageProcessingOptions;
    convertTextToJson?: boolean;
    preservePath?: boolean;
    fieldMapping?: {
        sourceField: string;
        targetField: string;
        isArray?: boolean;
        transformPath?: (filename: string) => string;
    }[];
    combineExistingFiles?: {
        existingFieldName: string;
        targetFieldName: string;
        newFileFieldName: string;
    }[];
}
export declare const FileUploadHooks: {
    processFileUpload(context: RequestContext, options?: Partial<EnhancedUploadOptions>): Promise<void>;
    processFieldMappings(context: RequestContext, filesByField: Record<string, any[]>, fieldMappings?: EnhancedUploadOptions["fieldMapping"]): void;
    processCombinedFiles(context: RequestContext, filesByField: Record<string, any[]>, processedFields: Record<string, any>, combineOptions?: EnhancedUploadOptions["combineExistingFiles"]): void;
    parseArrayField(field: any): any[];
    convertFieldsToJson(fields: Record<string, any>): Record<string, any>;
};
