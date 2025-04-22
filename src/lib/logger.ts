import winston, { Logger as WinstonLogger } from 'winston';
import { LoggingWinston } from '@google-cloud/logging-winston';

const isProd = process.env.NEXT_PUBLIC_NODE_ENV === 'production';

const transports: winston.transport[] = [];

if (isProd) {
  transports.push(new LoggingWinston());
} else {
  transports.push(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.printf(({ level, message, timestamp }) => {
          return `[${timestamp}] ${level}: ${message}`;
        })
      ),
    })
  );
}

const instance: WinstonLogger = winston.createLogger({
  level: 'debug',
  transports,
  format: winston.format.json(),
  exitOnError: false,
});

function formatArgs(args: unknown[]): string {
  return args
    .map((arg) => {
      if (typeof arg === 'string') return arg;
      try {
        return JSON.stringify(arg);
      } catch {
        return '[Unserializable Object]';
      }
    })
    .join(' ');
}

function info(...args: unknown[]): void {
  instance.info(formatArgs(args));
}

function debug(...args: unknown[]): void {
  instance.debug(formatArgs(args));
}

function error(...args: unknown[]): void {
  instance.error(formatArgs(args));
}

function log(...args: unknown[]): void {
  instance.info(formatArgs(args)); // alias for info
}

export const logger: {
  instance: WinstonLogger;
  info: (...args: unknown[]) => void;
  debug: (...args: unknown[]) => void;
  error: (...args: unknown[]) => void;
  log: (...args: unknown[]) => void;
} = {
  instance,
  info,
  debug,
  error,
  log,
};
