import { Response } from "express";

type SuccessResponse<T> = {
  success: true;
  code: number;
  data: T;
  timestamp: string;
};

type ErrorResponse = {
  success: false;
  code: number;
  error: string;
  details?: any[];
  timestamp: string;
};

export class HttpResponse {
  static send<T>(
    res: Response,
    data: T,
    code: number = 200
  ): Response<SuccessResponse<T>> {
    return res.status(code).json({
      success: true,
      code,
      data,
      timestamp: new Date().toISOString(),
    });
  }

  static error(
    res: Response,
    message: string,
    code: number = 500,
    details?: any[]
  ): Response<ErrorResponse> {
    const isProduction = process.env.NODE_ENV === "production";

    return res.status(code).json({
      success: false,
      code,
      error: message,
      details: isProduction ? undefined : details,
      timestamp: new Date().toISOString(),
    });
  }

  static handleResult<T>(
    res: Response,
    result: T | Error,
    successCode: number = 200
  ) {
    if (result instanceof Error) {
      this.error(res, result.message, 500, [result.stack]);
    } else {
      this.send(res, result, successCode);
    }
  }
}
