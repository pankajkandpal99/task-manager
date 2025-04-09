export interface FileInfo {
  fieldname: string;
  filename: string;
  originalFilename: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  path: string;
}

export interface UploadOptions {
  maxFileSize?: number;
  allowedMimeTypes?: string[];
  destination?: string;
}

export interface UploadResult {
  files: FileInfo[];
  fields: Record<string, any>;
}
