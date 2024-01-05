import { Hono } from "hono";
import { bearerAuth } from "hono/bearer-auth";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

type Bindings = {
  TOKEN: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

const schema = z.object({
  point: z.union([
    z.literal("ping"),
    z.literal("app.external_data_tool.query"),
  ]), // Restricts 'point' to two specific values
  params: z
    .object({
      app_id: z.string(),
      tool_variable: z.string(),
      inputs: z.record(z.any()).optional(),
      query: z.string(),
    })
    .optional(),
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
    // point === "app.external_data_tool.query"
    // impliment your logic here ⬇️
    
    // impliment your logic here ⬆️
    return c.json({
      result: "bang",
    });
  }
);

export default app;
