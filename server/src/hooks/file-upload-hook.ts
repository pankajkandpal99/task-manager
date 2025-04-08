import { handleFileUpload } from "../lib/file-upload";
import { RequestContext } from "../middleware/context";
import {
  ImageProcessingOptions,
  processMultipleImages,
} from "../services/image-processing.service";
import { UploadOptions } from "../types/file-upload-types";
import { logger } from "../utils/logger";

export interface EnhancedUploadOptions extends UploadOptions {
  processImages?: boolean;
  imageProcessingOptions?: ImageProcessingOptions;
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

      context.body = { ...context.body, ...fields };
    } catch (error) {
      logger.error("File upload processing failed:", error);
      throw error;
    }
  },
};
