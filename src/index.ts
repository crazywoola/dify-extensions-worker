import { z, createRoute, OpenAPIHono } from '@hono/zod-openapi'

const app = new OpenAPIHono()

const schema = z.object({
  title: z.string().min(1).openapi({ example: 'About today', description: 'Title of the post', deprecated: false }),
  content: z.string().min(1).openapi({ example: 'Today is a good day...', description: 'Content of the post', deprecated: false }),
})

const responseSchema = z.object({
  result: z.string().openapi({ example: 'ok' }),
})

const route = createRoute({
  method: 'get',
  path: '/posts',
  summary: 'Get posts',
  description: 'Get posts',
  operationId: 'getPosts',
  request: {
    params: schema,
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

app.openapi(route, (c) => {
  const { title, content } = c.req.valid('param')
  return c.json({ result: `title: ${title} content: ${content}` })
})

// The OpenAPI documentation will be available at /doc
app.doc('/doc', {
  openapi: '3.1.0',
  info: {
    version: '1.0.0',
    title: 'My API',
    description: 'My API description',
  },
  servers: [
    {
      url: 'http://localhost:8787',
    },
  ],
})

export default app