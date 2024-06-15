import { App } from "./app";
import { logger } from "./util/logger";

const app = new App();

const port: number = isNaN(Number(process.env.PORT))
  ? 8080
  : Number(process.env.PORT);

app
  .initRouter()
  .then(() => {
    app.setRouteMiddleware();
    app.listen(port);
  })
  .catch((e) => {
    logger.error(e);
    throw new Error("Failed to initialize router");
  });
