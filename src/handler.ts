import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function handleEvent(event: FetchEvent): Promise<Response> {
  const { request } = event

  event.waitUntil(
    prisma.log.create({
      data: {
        level: 'Info',
        message: `${request.method} ${request.url}`,
        meta: {
          headers: JSON.stringify(request.headers),
        },
      },
    })
  )
  return new Response(`request method: ${request.method}!`)
}
