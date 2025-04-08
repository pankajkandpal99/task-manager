import { Request } from "express";
import Busboy from "busboy";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { logger } from "../utils/logger";
import {
  FileInfo,
  UploadOptions,
  UploadResult,
} from "../types/file-upload-types";

const DEFAULT_OPTIONS: UploadOptions = {
  maxFileSize: 10 * 1024 * 1024, // 10MB
  allowedMimeTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
  destination: "uploads",
};

// Ensures the uploads directory exists
const ensureUploadsDirectoryExists = (destination: string): void => {
  const uploadPath = path.resolve(destination);
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }
};

// Generates a unique filename with extension
const generateUniqueFilename = (originalName: string): string => {
  const ext = path.extname(originalName);
  return `${uuidv4()}${ext}`;
};

// Validates file against size and type constraints
const validateFile = (
  fileInfo: Omit<FileInfo, "destination" | "path">,
  options: UploadOptions
): void => {
  // Validate file size
  if (fileInfo.size > (options.maxFileSize || DEFAULT_OPTIONS.maxFileSize!)) {
    throw new Error(
      `File ${fileInfo.filename} exceeds maximum size of ${options.maxFileSize! / 1024 / 1024}MB`
    );
  }

  // Validate MIME type
  const allowedTypes =
    options.allowedMimeTypes || DEFAULT_OPTIONS.allowedMimeTypes!;
  if (!allowedTypes.includes(fileInfo.mimetype)) {
    throw new Error(
      `File type ${fileInfo.mimetype} is not allowed. Allowed types: ${allowedTypes.join(", ")}`
    );
  }
};

// Handles file upload using Busboy
export const handleFileUpload = (
  req: Request,
  options: Partial<UploadOptions> = {}
): Promise<UploadResult> => {
  const mergedOptions = { ...DEFAULT_OPTIONS, ...options };
  ensureUploadsDirectoryExists(mergedOptions.destination!);

  return new Promise((resolve, reject) => {
    const busboy = Busboy({
      headers: req.headers,
      limits: {
        fileSize: mergedOptions.maxFileSize,
      },
    });

    const files: FileInfo[] = [];
    const fields: Record<string, any> = {};

    busboy.on("file", (fieldname, file, info) => {
      const { filename, encoding, mimeType } = info;
      const fileSize = 0;
      const chunks: Buffer[] = [];

      // Generate unique filename
      const uniqueFilename = generateUniqueFilename(filename);
      const destinationPath = path.join(
        mergedOptions.destination!,
        uniqueFilename
      );

      file.on("data", (chunk) => {
        chunks.push(chunk);
      });

      file.on("end", () => {
        const buffer = Buffer.concat(chunks);
        const fileSize = buffer.length;

        try {
          const fileInfo: Omit<FileInfo, "destination" | "path"> = {
            fieldname,
            filename: uniqueFilename,
            encoding,
            mimetype: mimeType,
            size: fileSize,
          };

          validateFile(fileInfo, mergedOptions);

          // Write file to disk
          fs.writeFileSync(destinationPath, buffer);

          files.push({
            ...fileInfo,
            destination: mergedOptions.destination!,
            path: destinationPath,
          });

          logger.info(
            `File uploaded successfully: ${uniqueFilename} (${fileSize} bytes)`
          );
        } catch (error) {
          logger.error(`Error processing file ${filename}:`, error);
          file.resume(); // Drain the file stream
        }
      });
    });

    busboy.on("field", (fieldname, val) => {
      fields[fieldname] = val;
    });

    busboy.on("finish", () => {
      resolve({ files, fields });
    });

    busboy.on("error", (error) => {
      logger.error("Busboy error:", error);
      reject(error);
    });

    req.pipe(busboy);
  });
};

// Gets a readable stream for a file
export const getFileStream = (filePath: string): fs.ReadStream => {
  if (!fs.existsSync(filePath)) {
    throw new Error("File not found");
  }
  return fs.createReadStream(filePath);
};

// Deletes a file from the filesystem
export const deleteFile = (filePath: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    fs.unlink(filePath, (error) => {
      if (error) {
        logger.error(`Error deleting file ${filePath}:`, error);
        reject(error);
      } else {
        logger.info(`File deleted successfully: ${filePath}`);
        resolve();
      }
    });
  });
};
