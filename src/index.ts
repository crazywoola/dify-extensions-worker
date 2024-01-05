import { Hono } from "hono";
import { bearerAuth } from "hono/bearer-auth";

type Bindings = {
  TOKEN: string
}

const app = new Hono<{ Bindings: Bindings }>()

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.post(
  "/endpoint",
  (c, next) => {
    const auth = bearerAuth({ token: c.env.TOKEN });
    return auth(c, next);
  },
  async (c) => {
    return c.json({
      result: "pong",
    });
  }
);

export default app;
