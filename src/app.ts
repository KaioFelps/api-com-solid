import fastify from "fastify";
import { routes } from "./http/routes";
import { ZodError } from "zod";
import { env } from "./env";

export const app = fastify();
app.register(routes);

app.setErrorHandler((error, _request, rep) => {
  if (error instanceof ZodError) {
    return rep
      .status(400)
      .send({ message: "Validation error.", issues: error.format() });
  }

  if (env.NODE_ENV !== "production") {
    console.log("ERRO ------------------------------------");
    console.error(error);
    console.log("ERRO ------------------------------------");
  } else {
    // TODO: aqui ficaria a integração para alguma ferramenta externa tipo o datadog, new relic, sentry
  }

  return rep.status(500).send({ message: "Internal server error." });
});
