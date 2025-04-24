export default class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public errors: any[] = [],
    public stack: string = ""
  ) {
    super(message);
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
