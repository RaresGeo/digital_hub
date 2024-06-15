import type { Request, Response } from "express";
import { Api as AuthApi } from "../adapter/auth/AuthApi";
import { SecurityDataType } from "../router";

const authenticateHandlerFactory =
  (AuthApi: AuthApi<SecurityDataType>) =>
  (req: Request, res: Response): void => {
    const token = req.params.token as string;
    const response = AuthApi.authenticate.authenticateDetail(token);
    res.json(response);
  };

export default authenticateHandlerFactory;
