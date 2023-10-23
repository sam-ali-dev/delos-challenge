import { z } from "zod";
import { ZodFastifyPlugin, createTags } from "./route";

const tags = createTags(__dirname) ?? "Root";

const plugin: ZodFastifyPlugin = async function (fastify) {
  fastify.get(
    "/",
    {
      schema: {
        description: "Backend Root URL",
        // tags,
        response: {
          200: z.object({
            root: z.boolean().refine((value) => value === true),
          }),
        },
      },
    },
    async function (request, reply) {
      return { root: true };
    }
  );
};

export default plugin;
