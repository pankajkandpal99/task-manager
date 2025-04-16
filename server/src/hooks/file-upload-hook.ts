import { RequestContext } from "../middleware/context";
import { handleFileUpload } from "../lib/file-upload";
import {
  ImageProcessingOptions,
  processMultipleImages,
} from "../services/image-processing.service";
import { UploadOptions } from "../types/file-upload-types";
import { logger } from "../utils/logger";
import path from "path";

export interface EnhancedUploadOptions extends UploadOptions {
  processImages?: boolean;
  imageProcessingOptions?: ImageProcessingOptions;
  convertTextToJson?: boolean;

  fieldMapping?: {
    sourceField: string;
    targetField: string;
    isArray?: boolean;
    transformPath?: (filename: string) => string;
  }[];
  // Option to combine existing and new files
  combineExistingFiles?: {
    existingFieldName: string;
    targetFieldName: string;
    newFileFieldName: string;
  }[];
}

export const FileUploadHooks = {
  async processFileUpload(
    context: RequestContext,
    options: Partial<EnhancedUploadOptions> = {}
  ): Promise<void> {
    if (!context.req.is("multipart/form-data")) return;

    try {
      const { files, fields } = await handleFileUpload(context.req, options);

      if (options.processImages && files.length > 0) {
        const { originals, variants } = await processMultipleImages(
          files,
          options.imageProcessingOptions
        );

        context.files = originals;
        context.imageVariants = variants;
      } else {
        context.files = files;
      }

      let processedFields = { ...fields };

      if (options.convertTextToJson) {
        processedFields = this.convertFieldsToJson(fields);
      }

      context.body = {
        ...context.body,
        ...processedFields,
        uploadPath: options.pathStructure
          ? path.join(options.destination || "uploads", options.pathStructure)
          : options.destination || "uploads",
      };

      let filesByField: Record<string, any[]> = {};

      if (context.files && context.files.length > 0) {
        // Group files by field name
        filesByField = context.files.reduce(
          (acc, file) => {
            if (!acc[file.fieldname]) {
              acc[file.fieldname] = [];
            }
            acc[file.fieldname].push(file);
            return acc;
          },
          {} as Record<string, any[]>
        );

        // Add files to body for validation
        Object.keys(filesByField).forEach((fieldname) => {
          if (fieldname === "backgroundImages") {
            context.body[fieldname] = filesByField[fieldname];
          } else if (filesByField[fieldname].length === 1) {
            context.body[fieldname] = filesByField[fieldname][0];
          } else {
            context.body[fieldname] = filesByField[fieldname];
          }
        });
      }

      // Handle dynamic field mappings
      if (options.fieldMapping && options.fieldMapping.length > 0) {
        this.processFieldMappings(context, filesByField, options.fieldMapping);
      }

      // Handle combining existing and new files
      if (
        options.combineExistingFiles &&
        options.combineExistingFiles.length > 0
      ) {
        this.processCombinedFiles(
          context,
          filesByField,
          processedFields,
          options.combineExistingFiles
        );
      }

      // Handle special case for hero-section-image when backgroundImages exists in the fields
      // This is needed because your route uses "hero-section-image" but we need to work with "backgroundImages"
      // const filesByField = context.files?.reduce(
      //   (acc, file) => {
      //     if (!acc[file.fieldname]) {
      //       acc[file.fieldname] = [];
      //     }
      //     acc[file.fieldname].push(file);
      //     return acc;
      //   },
      //   {} as Record<string, any[]>
      // );

      // if (
      //   filesByField &&
      //   filesByField["hero-section-image"] &&
      //   processedFields.backgroundImages
      // ) {
      //   try {
      //     // console.log("Processing background images...", processedFields);
      //     let existingImages = [];
      //     if (processedFields.existingImages) {
      //       if (typeof processedFields.existingImages === "string") {
      //         try {
      //           existingImages = JSON.parse(processedFields.existingImages);
      //           if (!Array.isArray(existingImages)) {
      //             existingImages = [existingImages];
      //           }
      //         } catch (e) {
      //           existingImages = [processedFields.existingImages];
      //         }
      //       } else if (Array.isArray(processedFields.existingImages)) {
      //         existingImages = processedFields.existingImages;
      //       } else if (processedFields.existingImages) {
      //         existingImages = [processedFields.existingImages];
      //       }
      //     }

      //     if (processedFields.backgroundImages) {
      //       let bgImages = [];
      //       if (typeof processedFields.backgroundImages === "string") {
      //         try {
      //           bgImages = JSON.parse(processedFields.backgroundImages);
      //           if (!Array.isArray(bgImages)) {
      //             bgImages = [bgImages];
      //           }
      //         } catch (e) {
      //           bgImages = [processedFields.backgroundImages];
      //         }
      //       } else if (Array.isArray(processedFields.backgroundImages)) {
      //         bgImages = processedFields.backgroundImages;
      //       } else if (processedFields.backgroundImages) {
      //         bgImages = [processedFields.backgroundImages];
      //       }

      //       existingImages = [...existingImages, ...bgImages];
      //     }

      //     const newImages = filesByField["hero-section-image"].map(
      //       (file) => `/uploads/${file.filename}`
      //     );

      //     // Combine both existing and new images
      //     context.body.backgroundImages = [...existingImages, ...newImages];
      //   } catch (error) {
      //     logger.error("Error processing background images:", error);
      //   }
      // }

      // console.log("Processed body:", context.body);

      // Update req.body for validation middleware
      context.req.body = context.body;
    } catch (error) {
      logger.error("File upload processing failed:", error);
      throw error;
    }
  },

  processFieldMappings(
    context: RequestContext,
    filesByField: Record<string, any[]>,
    fieldMappings: EnhancedUploadOptions["fieldMapping"] = []
  ): void {
    fieldMappings.forEach((mapping) => {
      if (filesByField[mapping.sourceField]) {
        const transformPath =
          mapping.transformPath ||
          ((filename: string) => `/uploads/${filename}`);

        const mappedFiles = filesByField[mapping.sourceField].map((file) =>
          transformPath(file.filename)
        );

        if (mapping.isArray) {
          context.body[mapping.targetField] = mappedFiles;
        } else if (mappedFiles.length === 1) {
          context.body[mapping.targetField] = mappedFiles[0];
        } else {
          context.body[mapping.targetField] = mappedFiles;
        }
      }
    });
  },

  processCombinedFiles(
    context: RequestContext,
    filesByField: Record<string, any[]>,
    processedFields: Record<string, any>,
    combineOptions: EnhancedUploadOptions["combineExistingFiles"] = []
  ): void {
    combineOptions.forEach((option) => {
      try {
        // Get existing files
        let existingFiles = [];
        if (processedFields[option.existingFieldName]) {
          existingFiles = this.parseArrayField(
            processedFields[option.existingFieldName]
          );
        }

        // Get new files
        const newFiles =
          filesByField[option.newFileFieldName]?.map(
            (file) => `/uploads/${file.filename}`
          ) || [];

        // Combine both existing and new files
        context.body[option.targetFieldName] = [...existingFiles, ...newFiles];
      } catch (error) {
        logger.error(
          `Error processing combined files for field ${option.targetFieldName}:`,
          error
        );
      }
    });
  },

  parseArrayField(field: any): any[] {
    if (typeof field === "string") {
      try {
        const parsed = JSON.parse(field);
        return Array.isArray(parsed) ? parsed : [parsed];
      } catch (e) {
        return [field];
      }
    } else if (Array.isArray(field)) {
      return field;
    } else if (field) {
      return [field];
    }
    return [];
  },

  convertFieldsToJson(fields: Record<string, any>): Record<string, any> {
    const result: Record<string, any> = {};

    for (const [key, value] of Object.entries(fields)) {
      if (typeof value === "string") {
        try {
          if (
            (value.trim().startsWith("{") && value.trim().endsWith("}")) ||
            (value.trim().startsWith("[") && value.trim().endsWith("]"))
          ) {
            result[key] = JSON.parse(value);
            continue;
          }

          // Handle arrays sent as multiple fields with same name
          if (key.endsWith("[]")) {
            const baseKey = key.slice(0, -2);
            if (!result[baseKey]) {
              result[baseKey] = [];
            }
            result[baseKey].push(value);
            continue;
          }
        } catch (e) {
          // If parsing fails, use the original string value
          logger.debug(`Failed to parse field ${key} as JSON`, e);
        }
      }

      // Default case: use the original value
      result[key] = value;
    }

    return result;
  },
};
