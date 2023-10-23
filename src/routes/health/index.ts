import { z } from "zod";
import { ZodFastifyPlugin, createTags } from "../route";

const tags = createTags(__dirname);

const route: ZodFastifyPlugin = async function (fastify) {
  fastify.get(
    "/",
    {
      schema: {
        description: "Health check endpoint",
        tags,
        response: {
          200: z.string().datetime({ offset: true }),
        },
      },
    },
    async function (request, reply) {
      return new Date().toISOString();
    }
  );
};

export default route;