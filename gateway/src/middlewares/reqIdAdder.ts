import { createNamespace } from 'cls-hooked';
import type { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

const nsid = uuidv4();
const ns = createNamespace(nsid);

const requestIdAdder = (
  _req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  ns.runAndReturn(() => {
    const id: string = uuidv4();
    ns.set('reqId', id);
    next();
  });
};

const get = (key: string): unknown => {
  if (ns.active) {
    return ns.get(key);
  }
};

export { get, requestIdAdder };
