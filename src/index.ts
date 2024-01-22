import { z, createRoute, OpenAPIHono } from '@hono/zod-openapi'

const app = new OpenAPIHono()

const schema = z.object({
  count: z.string().openapi({ example: "1", description: 'Number of quotes to get' }),
})

const responseSchema = z.object({
  result: z.string().openapi({ example: 'ok' }),
})

const route = createRoute({
  method: 'post',
  path: '/quotes',
  summary: 'Get quotes from breaking bad',
  description: 'Get quotes from breaking bad',
  operationId: 'GetQuotesFromBreakingBad',
  request: {
    body: {
      content: {
        'application/json': {
          schema: schema,
        },
      },
      description: '',
    },
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: responseSchema,
        },
      },
      description: '',
    },
  },
})

app.openapi(route, async (c) => {
  const { count } = c.req.valid('json')
  const url = `https://api.breakingbadquotes.xyz/v1/quotes/${count}`;
  const result = await fetch(url).then(res => res.text())
  return c.json({ result })
})

// The OpenAPI documentation will be available at /doc
app.doc31('/doc', c => (
  {
    openapi: '3.1.0',
    info: {
      version: '1.0.0',
      title: 'My API',
      description: 'My API description',
    },
    servers: [
      {
        url: new URL(c.req.url).origin,
      },
    ],
  }
))

export default app