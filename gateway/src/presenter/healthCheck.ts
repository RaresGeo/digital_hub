import type { Request, Response } from "express";

const healthcheckHandlerFactory =
  () =>
  (_: Request, res: Response): void => {
    res.json({
      ok: true,
      serviceName: "API Gateway",
    });
  };

export default healthcheckHandlerFactory
