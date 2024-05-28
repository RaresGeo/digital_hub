import { createLogger } from "winston";
import config from "../config/index";

const logLevel: string = process.env.LOG_LEVEL || "debug";
export const logger = createLogger({
  ...config.logger('default', logLevel),
  levels: config.logger().levels,
});
