import fp from 'fastify-plugin'
import swaggerPlugin from '@fastify/swagger'
import swaggerUIPlugin from '@fastify/swagger-ui'
import { FastifyPluginAsync } from 'fastify'
import { jsonSchemaTransform } from 'fastify-type-provider-zod'
import { ServerConfig } from '../configuration'

/**
 * This plugin for serving dynamic swagger schemas & ui
 * @see https://github.com/fastify/fastify-swagger
 * @see https://github.com/fastify/fastify-swagger-ui
 */

const plugin: FastifyPluginAsync = async function (fastify) {
  await fastify.register(swaggerPlugin, {
    swagger: {
      host: `localhost:${ServerConfig.API_PORT}`,
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json'],
      info: {
        title: 'Insurance API Server',
        description: 'Insurance API Server with Postgres',
        version: '0.0.1'
      }
    },
    transform: jsonSchemaTransform
  })

  await fastify.register(swaggerUIPlugin, {
    routePrefix: '/docs',
    uiConfig: {
      deepLinking: false,
      docExpansion: 'list'
    },
    transformSpecificationClone: true
  })
}

export default fp(plugin, { name: 'swagger-plugin' })
