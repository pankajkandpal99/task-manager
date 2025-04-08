export type FileInfo = {
  fieldname: string;
  filename: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  path: string;
};

export type UploadOptions = {
  maxFileSize?: number;
  allowedMimeTypes?: string[];
  destination?: string;
};

export type UploadResult = {
  files: FileInfo[];
  fields: Record<string, any>;
};
