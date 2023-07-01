import { FastifyInstance } from "fastify";
import { JWTVerifier } from "../../middleware/jwt-verifier";
import { search } from "./search.controller";
import { create } from "./create.controller";
import { nearby } from "./nearby.controller";

export async function gymsRoutes(app: FastifyInstance) {
  // middleware. Fastify calls it hooks
  app.addHook("onRequest", JWTVerifier);

  app.get("/gyms/search", search);
  app.get("/gyms/nearby", nearby);

  app.post("/gyms/create", create);
}
