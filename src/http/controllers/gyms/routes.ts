import { FastifyInstance } from "fastify";
import { JWTVerifier } from "../../middleware/jwt-verifier";

export async function gymsRoutes(app: FastifyInstance) {
  // middleware. Fastify calls it hooks
  app.addHook("onRequest", JWTVerifier);
}
