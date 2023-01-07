import Fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify'
import { Server, IncomingMessage, ServerResponse } from 'http'

import dotenv from 'dotenv'
import buildIndex from './utils/build-index'

dotenv.config()

console.log('[ORG] Welcome to ORG! Staring up...')

const port : number = parseInt(process.env.PORT, 10) || 3000

const server: FastifyInstance = Fastify({})

const opts: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          pong: {
            type: 'string'
          }
        }
      }
    }
  }
}

server.get('/api/index', async (req, res)=>{
  console.log('[ORG] building index')
  return buildIndex(process.env.ROOT)
})

server.get('/ping', opts, async (request, reply) => {
  return { pong: 'it worked!' }
})

const start = async () => {
  try {
    await server.listen({ port })

    const address = server.server.address()
    console.log('[ORG] address: ', address)

  } catch (err) {
    console.error('[ORG] ewww', err.message)
    server.log.error(err)
    process.exit(1)
  }
}
start()