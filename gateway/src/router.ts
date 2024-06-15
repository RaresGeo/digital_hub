import { AxiosRequestConfig } from "axios";
import type { Express, RequestHandler } from "express";
import { Api as AuthApi } from "./adapter/auth/AuthApi";
import authenticateHandlerFactory from "./presenter/authenticate";
import healthcheckHandlerFactory from "./presenter/healthCheck";

interface Route {
  method: "get" | "post" | "put" | "delete";
  path: string;
  handler: RequestHandler;
}

export type SecurityDataType = { token: string } | null;

class Router {
  private readonly app: Express;
  private routes: Route[];

  constructor(app: Express, routes: Route[]) {
    this.app = app;
    this.routes = routes;
  }

  public static async create(app: Express): Promise<Router> {
    const tokenSecurityWorker = (securityData: SecurityDataType) => {
      if (!securityData?.token) throw new Error("No security data provided");
      return {
        headers: { Authorization: `Bearer ${securityData.token}` },
      } as AxiosRequestConfig;
    };

    const authApi = new AuthApi<SecurityDataType>({
      securityWorker: tokenSecurityWorker,
      secure: true,
      format: "json",
      baseURL: process.env.AUTH_API_URL!,
    });
    authApi.setSecurityData({ token: process.env.AUTH_API_TOKEN! });

    const routes: Route[] = [
      {
        method: "get",
        path: "/",
        handler: healthcheckHandlerFactory(),
      },
      {
        method: "post",
        path: "/authenticate/:token",
        handler: authenticateHandlerFactory(authApi),
      },
    ];

    return new Router(app, routes);
  }

  public setRoutes(): void {
    this.routes.forEach((route) => {
      this.app[route.method](route.path, route.handler);
    });
  }
}

export default Router;
