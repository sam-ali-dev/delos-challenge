import "./loader";
import { z } from "zod";
// import { env as NODE_ENV } from "./loader";
const NODE_ENV = process.env;

enum ENV {
  dev = "dev",
  prod = "prod",
  stag = "stag",
  local = "local",
}

enum LOG_LEVEL {
  debug = "debug",
  info = "info",
  warn = "warn",
  error = "error",
}

const ZodDBSchema = z.object({
  DB_HOST: z.string().nonempty(),
  DB_PORT: z.coerce.number().default(5432),
  DB_USER: z.string().nonempty(),
  DB_PASSWORD: z.string().nonempty(),
  DB_NAME: z.string().nonempty(),
  DB_MIN: z.coerce.number().default(2),
  DB_MAX: z.coerce.number().default(4),
  DB_PAGE_SIZE: z.coerce.number().default(10),
  DB_CONN_TIMEOUT: z.coerce.number().default(5000),
  DB_IDLE_TIMEOUT: z.coerce.number().default(60_000),
});


const ZodEnvSchema = z.nativeEnum(ENV);

const ZodServerSchema = z.object({
  APP_SECRET: z.string().nonempty(),
  API_PORT: z.coerce.number().default(3000),
  LOG_LEVEL: z.nativeEnum(LOG_LEVEL),
});

export const DBConfig = ZodDBSchema.parse(process.env);
export const ServerConfig = ZodServerSchema.parse(process.env);

const env = NODE_ENV //ZodEnvSchema.parse(NODE_ENV);

export default {
  DBConfig,
  env,
  ServerConfig
};