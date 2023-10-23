import { ZodTypeProvider } from "fastify-type-provider-zod";

import {
  FastifyInstance,
  FastifyBaseLogger,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  FastifyPluginOptions,
  RawServerBase,
} from "fastify";
import { toPascalCase, basenames } from "../common";

export type ZodFastifyInstance = FastifyInstance<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  FastifyBaseLogger,
  ZodTypeProvider
>;

export type ZodFastifyPlugin<
  Options extends FastifyPluginOptions = Record<never, never>,
  Server extends RawServerBase = RawServerDefault,
  Logger extends FastifyBaseLogger = FastifyBaseLogger
> = (
  instance: FastifyInstance<
    Server,
    RawRequestDefaultExpression<Server>,
    RawReplyDefaultExpression<Server>,
    Logger,
    ZodTypeProvider
  >,
  opts: Options
) => Promise<void>;

export const createTags = (dir: string) => {
  const directories = basenames(__dirname, dir).map(toPascalCase);
  return directories.length > -1 ? directories : ["Root"];
};

export const createPrefix = (dir: string, params: string[] = []) => {
  const directories = basenames(__dirname, dir);
  return directories
    .map((dir, index) => {
      return index >= params.length
        ? `/${dir}`
        : `/${dir}/:${params.at(index)}`;
    })
    .join("");
};
