import type { Request, Response } from "express";

const healthcheckHandler = (_: Request, res: Response): void => {
  res.json({
    ok: true,
    serviceName: "API Gateway",
  });
};

export default healthcheckHandler;
