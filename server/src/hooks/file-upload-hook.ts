import { RequestContext } from "../middleware/context";
import { handleFileUpload } from "../lib/file-upload";
import {
  ImageProcessingOptions,
  processMultipleImages,
} from "../services/image-processing.service";
import { UploadOptions } from "../types/file-upload-types";
import { logger } from "../utils/logger";

export interface EnhancedUploadOptions extends UploadOptions {
  processImages?: boolean;
  imageProcessingOptions?: ImageProcessingOptions;
  convertTextToJson?: boolean;
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

      context.body = { ...context.body, ...processedFields };

      if (context.files && context.files.length > 0) {
        // Group files by field name
        const filesByField = context.files.reduce(
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

      // Handle special case for hero-section-image when backgroundImages exists in the fields
      // This is needed because your route uses "hero-section-image" but we need to work with "backgroundImages"
      const filesByField = context.files?.reduce(
        (acc, file) => {
          if (!acc[file.fieldname]) {
            acc[file.fieldname] = [];
          }
          acc[file.fieldname].push(file);
          return acc;
        },
        {} as Record<string, any[]>
      );

      if (
        filesByField &&
        filesByField["hero-section-image"] &&
        processedFields.backgroundImages
      ) {
        try {
          // console.log("Processing background images...", processedFields);
          let existingImages;
          if (typeof processedFields.backgroundImages === "string") {
            try {
              existingImages = JSON.parse(processedFields.backgroundImages);
              if (!Array.isArray(existingImages)) {
                existingImages = [existingImages];
              }
            } catch (e) {
              existingImages = [processedFields.backgroundImages]; // If parsing fails, treat as a single string
            }
          } else if (Array.isArray(processedFields.backgroundImages)) {
            existingImages = processedFields.backgroundImages;
          } else if (processedFields.backgroundImages) {
            existingImages = [processedFields.backgroundImages];
          } else {
            existingImages = [];
          }

          context.body.backgroundImages = [
            ...existingImages,
            ...filesByField["hero-section-image"].map(
              (file) => `/uploads/${file.filename}`
            ),
          ];
        } catch (error) {
          logger.error("Error processing background images:", error);
        }
      }

      // console.log("Processed body:", context.body);

      // Update req.body for validation middleware
      context.req.body = context.body;
    } catch (error) {
      logger.error("File upload processing failed:", error);
      throw error;
    }
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
