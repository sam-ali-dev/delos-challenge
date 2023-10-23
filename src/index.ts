// import fastify from 'fastify'
// const server = fastify({logger: true})


// server.get('/', async (request, reply) => {
    
//   return 'Hello there! 👋'
// })

// server.listen(8080, (err, address) => {
//   if (err) {
//     console.error(err)
//     process.exit(1)
//   }
//   console.log(`Started server at ${address}`)
//   server.log.info(`Started server at ${address}`);

// })

import path from "path";
import fastify from "fastify";
import autoload from "@fastify/autoload";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { fastifyConfigs } from "./config";
// import { db } from './services'
import { ServerConfig } from "./configuration";
import { exceptionHandler } from "./libs";

const app = fastify(fastifyConfigs);

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.setErrorHandler(exceptionHandler);

const registerPlugins = async () => {
  await app.register(autoload, { dir: path.join(__dirname, 'plugins') });
  await app.after();
};

const registerRoutes = async () => {
  await app.register(autoload, {
    routeParams: true,
    dir: path.join(__dirname, 'routes'),
    autoHooks: true,
    cascadeHooks: true,
  });
  await app.ready();
  // console.log(app.printRoutes({ commonPrefix: false, includeHooks: false }))
};

const listen = async () =>
  app.listen({
    port: ServerConfig.API_PORT,
  });

const cleanUp = async () => {
  for (const signal of ['SIGINT', 'SIGTERM']) {
    process.on(signal, async () => {
      // db.destroy();
      app.close().then((err) => {
        console.log(`close application on ${signal}`);
        process.exit(err ? 1 : 0);
      });
    });
  }
};

const failure = (error: any) => {
  console.log('app error:', error);
  process.exit(1);
};

Promise.resolve()
  .then(registerPlugins)
  .then(registerRoutes)
  .then(cleanUp)
  .then(listen)
  .catch(failure);
