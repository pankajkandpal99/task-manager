import { Response } from "express";
import { HttpResponse } from "./service-response";

export type Result<T, E = Error> =
  | { success: true; data: T; code?: number }
  | { success: false; error: E; code?: number };

export const tryCatch = async <T>(
  fn: () => Promise<T>,
  errorHandler?: (error: unknown) => Error
): Promise<Result<T>> => {
  try {
    const data = await fn();
    return { success: true, data, code: 200 };
  } catch (error) {
    return {
      success: false,
      error: errorHandler
        ? errorHandler(error)
        : error instanceof Error
          ? error
          : new Error(String(error)),
      code:
        error instanceof Error && "statusCode" in error
          ? (error.statusCode as number)
          : 500,
    };
  }
};

export const handleResult =
  (res: Response) =>
  async <T>(result: Result<T>) => {
    if (result.success) {
      return HttpResponse.send(res, result.data, result.code);
    } else {
      return HttpResponse.error(
        res,
        result.error.message,
        result.code || 500,
        process.env.NODE_ENV === "production" ? undefined : [result.error.stack]
      );
    }
  };

export const pipe =
  (...fns: Function[]) =>
  (x: any) =>
    fns.reduce((v, f) => f(v), x);

export const tap = (fn: (x: any) => void) => (x: any) => {
  fn(x);
  return x;
};
