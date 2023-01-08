import Fastify, { FastifyInstance, FastifyReply, FastifyRequest, RouteShorthandOptions } from 'fastify'
// import { Server, IncomingMessage, ServerResponse } from 'http'
const { NotFound } = require('http-errors')

import dotenv from 'dotenv'
import buildIndex, { load } from './utils/indexer'
import { exists, ROOT } from './utils/file-list'

dotenv.config()

console.log('[ORG] Welcome to ORG! Staring up...')
if (!ROOT){
  console.error('[ORG] please set the ROOT environmental variable to your note\'s root')
  process.exit(1)
}
console.log('[ORG] root is', ROOT)

const port: number = parseInt(process.env.PORT, 10) || 3000

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

server.get('/api/index', async (req, res) => {
  console.log('[ORG] building index')
  return buildIndex()
})

server.decorate('notFound', (request: FastifyRequest, reply: FastifyReply) => {
  reply.code(404).type('text/html').send('Not Found')
})


server.get('/api/load/*', async (req: FastifyRequest, res) => {
  const fileName = (req.params as {'*': string})['*']
  console.log('[ORG] !!! getting file', fileName)
  if (!exists(fileName)){
    throw new NotFound(fileName + ' not found.')
  }
  return await load(fileName)
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