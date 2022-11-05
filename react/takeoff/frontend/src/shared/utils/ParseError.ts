export type TError = {
  statusCode: number;
  message: string;
};

export class ParseError extends Error {
  statusCode;
  constructor(statusCode: number, message: string) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}
