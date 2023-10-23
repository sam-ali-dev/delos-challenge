import fp from "fastify-plugin";
import jwtPlugin from "@fastify/jwt";
import { FastifyPluginAsync } from "fastify";
import { ServerConfig } from "../configuration";

const plugin: FastifyPluginAsync = async function (fastify) {
    await fastify.register(jwtPlugin, {
        secret: ServerConfig.APP_SECRET
    })
};

export default fp(plugin, { name: "jwt-plugin" });