import fp from "fastify-plugin";
import corsPlugin from "@fastify/cors";
import { FastifyPluginAsync } from "fastify";

/**
 * This plugin enables the use of CORS in fastify application
 * @see https://github.com/fastify/fastify-cors
 */

const plugin: FastifyPluginAsync = async function (fastify) {
  //  TODO: Change CORS setting before deploying to production
  await fastify.register(corsPlugin);
};

export default fp(plugin, { name: "cors-plugin" });