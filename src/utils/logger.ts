import winston from "winston";

export const Logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
});
