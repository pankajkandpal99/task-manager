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
    if (!context.req.is("multipart/form-data")) {
      return;
    }

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

      // Process fields according to options
      let processedFields = { ...fields };

      // Convert JSON strings to objects when needed
      if (options.convertTextToJson) {
        processedFields = this.convertFieldsToJson(fields);
      }

      // Store processed fields in context body
      context.body = { ...context.body, ...processedFields };

      // Also add files to the req.body for Zod validation if needed
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
          if (filesByField[fieldname].length === 1) {
            context.body[fieldname] = filesByField[fieldname][0];
          } else {
            context.body[fieldname] = filesByField[fieldname];
          }
        });
      }

      // Update req.body for validation middleware
      context.req.body = context.body;
    } catch (error) {
      logger.error("File upload processing failed:", error);
      throw error;
    }
  },

  // Convert string fields that look like JSON to actual objects
  convertFieldsToJson(fields: Record<string, any>): Record<string, any> {
    const result: Record<string, any> = {};

    for (const [key, value] of Object.entries(fields)) {
      if (typeof value === "string") {
        try {
          // Check if the string starts with [ or { which indicates JSON
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
