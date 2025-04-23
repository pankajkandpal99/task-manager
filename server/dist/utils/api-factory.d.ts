import { RequestHandler } from "express";
import { RequestContext } from "../middleware/context";
import { ZodSchema } from "zod";
import { EnhancedUploadOptions } from "../hooks/file-upload-hook";
export type ApiHandlerOptions = {
    bodySchema?: ZodSchema;
    querySchema?: ZodSchema;
    requireAuth?: boolean;
    requireAdmin?: boolean;
    useTransaction?: boolean;
    auditLog?: boolean;
    fileUpload?: {
        enabled: boolean;
        options?: Partial<EnhancedUploadOptions>;
        convertTextToJson?: boolean;
        validateBeforeAuth?: boolean;
    };
};
export declare function createApiHandler(handler: (context: RequestContext) => Promise<any>, options?: ApiHandlerOptions): RequestHandler[];
