import { Hono } from "hono";
import { bearerAuth } from "hono/bearer-auth";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { generateSchema } from '@anatine/zod-openapi';

type Bindings = {
  TOKEN: string;
};

const app = new Hono<{ Bindings: Bindings }>();

const schema = z.object({
  point: z.union([
    z.literal("ping"),
    z.literal("app.external_data_tool.query"),
  ]), // Restricts 'point' to two specific values
  params: z
    .object({
      app_id: z.string().optional(),
      tool_variable: z.string().optional(),
      inputs: z.record(z.any()).optional(),
      query: z.any()
    })
    .optional(),
});

// Generate OpenAPI schema
app.get("/", (c) => {
  return c.json(generateSchema(schema));
});


app.post(
  "/endpoint",
  (c, next) => {
    const auth = bearerAuth({ token: c.env.TOKEN });
    return auth(c, next);
  },
  zValidator("json", schema),
  async (c) => {
    const { point, params } = c.req.valid("json");
    if (point === "ping") {
      return c.json({
        result: "pong",
      });
    }
    // ⬇️ impliment your logic here ⬇️
    // point === "app.external_data_tool.query"
    // https://api.breakingbadquotes.xyz/v1/quotes
    const count = params?.inputs?.count ?? 1;
    const url = `https://api.breakingbadquotes.xyz/v1/quotes/${count}`;
    const result = await fetch(url).then(res => res.text())
    // ⬆️ impliment your logic here ⬆️
    return c.json({
      result
    });
  }
);

export default app;
