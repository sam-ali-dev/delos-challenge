import fp from "fastify-plugin";
import faviconPlugin from "fastify-favicon";
import { FastifyPluginAsync } from "fastify";

/**
 * This plugin handles favicon.ico requests from the browser
 * @see https://github.com/smartiniOnGitHub/fastify-favicon
 */

const plugin: FastifyPluginAsync = async function (fastify) {
  await fastify.register(faviconPlugin);
};

export default fp(plugin, { name: "favicon-plugin" });