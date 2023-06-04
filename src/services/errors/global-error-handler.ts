import { env } from "@/env";
import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { ZodError } from "zod";

export function GlobalErrorHandler(
  error: FastifyError,
  _request: FastifyRequest,
  rep: FastifyReply
) {
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
}
