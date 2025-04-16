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
      },
    },
  };
}

// import {
//   FileUploadConfigKey,
//   getFileUploadConfig,
// } from "../config/file-upload-config";
// import { ApiHandlerOptions } from "../utils/api-factory";

// export interface FileUploadConfig {
//   fieldName: string | string[];
//   options?: {
//     convertTextToJson?: boolean;
//     validateBeforeAuth?: boolean;
//     pathStructure?: string;
//     processImages?: boolean;
//     fieldMapping?: {
//       sourceField: string;
//       targetField: string;
//       isArray?: boolean;
//       transformPath?: (filename: string) => string;
//     }[];
//     combineExistingFiles?: {
//       existingFieldName: string;
//       targetFieldName: string;
//       newFileFieldName: string;
//     }[];
//   };
// }

// export function withFileUpload(
//   handlerOptions: ApiHandlerOptions,
//   fieldConfig: {
//     name: string | string[];
//     configKey?: FileUploadConfigKey | FileUploadConfigKey[];
//     mapping?: {
//       sourceField: string;
//       targetField: string;
//       isArray?: boolean;
//     }[];
//     combineExisting?: {
//       existingFieldName: string;
//       targetFieldName: string;
//       newFileFieldName: string;
//     }[];
//   },
//   uploadOptions: FileUploadConfig["options"] = {}
// ): ApiHandlerOptions {
//   const fieldMappings = [];
//   const combinedFields = [];

//   const fieldNames = Array.isArray(fieldConfig.name)
//     ? fieldConfig.name
//     : [fieldConfig.name];

//   if (fieldNames.includes("hero-section-image")) {
//     fieldMappings.push({
//       sourceField: "hero-section-image",
//       targetField: "heroSectionImage",
//       isArray: false,
//     });

//     combinedFields.push({
//       existingFieldName: "existingImages",
//       targetFieldName: "backgroundImages",
//       newFileFieldName: "hero-section-image",
//     });
//   }

//   if (uploadOptions.fieldMapping) {
//     fieldMappings.push(...uploadOptions.fieldMapping);
//   }

//   if (fieldConfig.combineExisting) {
//     combinedFields.push(...fieldConfig.combineExisting);
//   }

//   // Add any custom combined fields from uploadOptions for backward compatibility
//   if (uploadOptions.combineExistingFiles) {
//     combinedFields.push(...uploadOptions.combineExistingFiles);
//   }

//   // Get the config based on configKey
//   const baseConfig = fieldConfig.configKey
//     ? getFileUploadConfig(fieldConfig.configKey)
//     : {};

//   return {
//     ...handlerOptions,
//     fileUpload: {
//       enabled: true,
//       validateBeforeAuth: uploadOptions.validateBeforeAuth ?? false,
//       convertTextToJson: uploadOptions.convertTextToJson ?? true,
//       options: {
//         ...baseConfig,
//         fieldMapping: fieldMappings.length > 0 ? fieldMappings : undefined,
//         combineExistingFiles:
//           combinedFields.length > 0 ? combinedFields : undefined,
//         processImages:
//           uploadOptions.processImages !== undefined
//             ? uploadOptions.processImages
//             : baseConfig.processImages,
//         pathStructure: uploadOptions.pathStructure || baseConfig.pathStructure,
//       },
//     },
//   };
// }
