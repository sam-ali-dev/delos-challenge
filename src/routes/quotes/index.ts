import { z } from 'zod'
import { ZodFastifyPlugin, createTags } from '../route'
import { ZodCreateQuoteSchema } from './schema'
import axios from 'axios'

const tags = createTags(__dirname)

const route: ZodFastifyPlugin = async function (fastify) {
  fastify.get(
    '/best-three',
    {
      schema: {
        description: 'It will return best 3 quotes.',
        tags,
        response: {
          200: z.array()
        }
      }
    },
    async function (request, reply) {
      const quotes = await quotes.findAll({
        limit: 3,
        order: [['rate', 'DESC']]
      })
      return quotes
    }
  )

  const handleNewUser = async (reqData: any) => {
    try {
      const query: string = `age=${reqData.age}&model=${reqData.model}&year=${reqData.yearOfModel}`
      const { data, status } = await axios.get(
        `https://localhost/${query}?limit=5`,
        {
          headers: {
            Accept: 'application/json'
          }
        }
      )
      //Bulk insert data into DBB
      await quotes.bulkInsert(data)
      return true
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('error message: ', error.message)
        return null
      } else {
        console.log('unexpected error: ', error)
        return null
      }
    }
  }

  fastify.post(
    '/',
    {
      schema: {
        description: 'It will return best 3 quotes.',
        body: ZodCreateQuoteSchema,
        tags,
        response: {
          200: z.string()
        }
      }
    },
    async function (request, reply) {
      if (await handleNewUser(request.body)) {
        return 'Updated Successfully.'
      } else {
        return 'Update Failed.'
      }
    }
  )
}

export default route
