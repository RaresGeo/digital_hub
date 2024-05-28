import cors from "cors";
import express, {
  json,
  static as static_,
  urlencoded,
  type Express,
} from "express";
import config from "./config";
import { errorHandler } from "./middlewares/errorHandler";
import { requestIdAdder } from "./middlewares/reqIdAdder";
import { reqIdAdderInResponse } from "./middlewares/reqIdAdderInResponse";
import setRoutes from "./routes";
import { logger } from "./util/logger";

export class App {
  private readonly app: Express;

  constructor() {
    this.app = express();
    this.app.use(static_("public"));
    this.app.use(json({ limit: "5mb" }));
    this.app.use(
      urlencoded({
        limit: "5mb",
        extended: true,
      }),
    );
    this.app.use(requestIdAdder);
    this.app.use(cors(config.cors));

    setRoutes(this.app);

    this.app.use(errorHandler);
    this.app.use(reqIdAdderInResponse);
  }

  public listen(port: number): void {
    this.app.listen(port, () => {
      logger.info(`listening on PORT: ${port}...`);
    });
  }
}
