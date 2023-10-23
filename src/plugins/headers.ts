import fp from "fastify-plugin";
import { FastifyPluginAsync } from "fastify";

/**
 * This plugin removes Date header from all responses
 * @see https://nodejs.org/api/http.html#responsesenddate
 *
 * This plugin adds X-Response-Time header to all responses
 * The X-Response-Time contains server request processing time in milliseconds (excluding round trip time)
 * @see https://webtechsurvey.com/response-header/x-response-time
 * @see https://fastify.dev/docs/latest/Reference/Reply/#getresponsetime
 */

const plugin: FastifyPluginAsync = async function (fastify) {
  fastify.addHook("onSend", async (request, reply) => {
    // Remove Date header from response
    // ref: https://nodejs.org/api/http.html#responsesenddate
    reply.raw.sendDate = false;
    // Add X-Response-Time to response
    // onSend only includes request processing time (does not include the time to send response to the client)
    reply.header("X-Response-Time", reply.getResponseTime().toFixed(3));
  });
};

export default fp(plugin, { name: "headers-plugin" });