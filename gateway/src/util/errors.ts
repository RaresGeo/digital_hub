import { logger } from "./logger";

export class ValidationError extends Error {
  statusCode: number;
  logLevel: string;

  constructor(message?: string, logLevel?: string) {
    super(message);
    this.name = "ValidationError";
    this.statusCode = 400;
    this.logLevel = logLevel || "debug";
  }
}

export class InternalError extends Error {
  statusCode: number;
  logLevel: string;

  constructor(message?: string, logLevel?: string) {
    super(message);
    this.name = "InternalError";
    this.statusCode = 500;
    this.logLevel = logLevel || "debug";
  }
}

export const handleAsyncError = (error: unknown): void => {
  if (error instanceof InternalError) {
    logger.log(error.logLevel, error.message || "");
  } else {
    logger.log("error", String(error instanceof Error ? error.message : error));
  }
};
