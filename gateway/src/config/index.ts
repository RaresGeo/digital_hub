import { format, transports, type LoggerOptions } from "winston";
import { get as getContextValue } from "../middlewares/reqIdAdder";

export default {
  cors: {
    origin:
      process.env.NODE_ENV === 'development'
        ? '*'
        : process.env.FRONTEND_ORIGIN?.toString(),
    methods: ['GET', 'PUT', 'POST'],
  },
  logger: (label = 'default', logLevel?: string): LoggerOptions => {
    const customLevels = {
      levels: {
        critical: 0,
        error: 1,
        warn: 2,
        info: 3,
        debug: 4,
      },
    };

    const defaultLevel = 'debug';
    const customFormat = format.printf(
      ({ timestamp, level, message, ...meta }) =>
        `${String(
          timestamp,
        )} [${level.toUpperCase()}] [${label}] [reqId: ${String(
          getContextValue('reqId'),
        )}] ${String(message)} ${JSON.stringify(meta)}`,
    );

    return {
      levels: customLevels.levels,
      level: logLevel || defaultLevel,
      format: format.combine(
        format.json(),
        format.label({
          label,
        }),
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.errors({ stack: true }),
        customFormat,
      ),
      transports: [
        new transports.Console({
          level: logLevel || defaultLevel,
          stderrLevels: ['error'], //containing the levels to log to stderr
          consoleWarnLevels: [],
        }),
      ],
    };
  },
};
