import type { NextFunction, Request, Response } from "express";
import { get as getContextValue } from "./reqIdAdder";

export const reqIdAdderInResponse = (
  _req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const reqId: string = getContextValue('reqId') as string;

  res.status(Number(res.locals.status) || 200).json({
    requestId: reqId,
    status: (res.locals.status as number) || 200,
    ...res.locals.data,
  });

  next();
};
