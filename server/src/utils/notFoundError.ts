export class NotFoundError extends Error {
  statusCode: number;

  constructor(message?: string) {
    super(message || "Resource not found");
    this.name = "NotFoundError";
    this.statusCode = 404;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NotFoundError);
    }
  }
}
