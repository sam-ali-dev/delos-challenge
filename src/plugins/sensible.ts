import fp from "fastify-plugin";
import sensiblePlugin from "@fastify/sensible";
import { FastifyPluginAsync } from "fastify";

/**
 * This plugin adds some utilities to handle http errors
 * @see https://github.com/fastify/fastify-sensible
 */

const plugin: FastifyPluginAsync = async function (fastify) {
  await fastify.register(sensiblePlugin);
};

export default fp(plugin, { name: "sensible-plugin" });
