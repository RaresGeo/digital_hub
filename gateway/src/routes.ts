import type { Express, RequestHandler } from "express";
import healthcheckHandler from "./presenter/healthCheck";

interface Route {
  method: "get" | "post" | "put" | "delete";
  path: string;
  handler: RequestHandler;
}

export const routes: Route[] = [
  {
    method: "get",
    path: "/",
    handler: healthcheckHandler,
  },
];

const setRoutes = (app: Express): void => {
  routes.forEach((route) => {
    app[route.method](route.path, route.handler);
  });
};

export default setRoutes;
