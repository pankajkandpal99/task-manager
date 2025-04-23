export interface FileInfo {
  fieldname: string;
  filename: string;
  originalFilename: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  path: string;
  publicUrl: string;
}

export interface UploadOptions {
  maxFileSize?: number;
  allowedMimeTypes?: string[];
  destination?: string;
  pathStructure?: string;
  useOriginalFilename?: boolean;
}

export interface UploadResult {
  files: FileInfo[];
  fields: Record<string, any>;
}
