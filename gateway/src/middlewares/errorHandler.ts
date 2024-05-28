import type { NextFunction, Request, Response } from "express";
import { InternalError, ValidationError } from "../util/errors";
import { logger } from '../util/logger';

type AbstractError = InternalError | ValidationError | null;

export const errorHandler = (
  error: AbstractError,
  _req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const logLevel = error?.logLevel || '';
  const errorMessage = error?.message || '';

  if (logLevel === 'info') {
    logger.info({ message: errorMessage });
  } else if (logLevel === 'error') {
    logger.error({ message: errorMessage });
  } else if (logLevel === 'warn') {
    logger.warn({ message: errorMessage });
  } else if (logLevel === 'critical') {
    logger.log('critical', errorMessage);
  } else {
    logger.debug({ message: errorMessage });
  }

  if (error === null) {
    next();
    return;
  }

  if (error instanceof InternalError) {
    res.locals.status = 500;
    res.locals.data = {
      status: 500,
      message: 'An internal error occurred',
    };
  } else if (error instanceof ValidationError) {
    res.locals.status = 400;
    res.locals.data = {
      status: 400,
      message: error.message,
    };
  } else {
    res.locals.status = 500;
    res.locals.data = {
      status: 500,
      message: 'An unsupported error occurred',
    };
  }

  next();
};
