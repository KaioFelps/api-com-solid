import { FastifyInstance } from "fastify";
import { register } from "./controllers/register.controller";
import { authenticate } from "./controllers/authenticate.controller";
import { profile } from "./controllers/profile";
import { JWTVerifier } from "./middleware/jwt-verifier";

export async function routes(app: FastifyInstance) {
  app.post("/users", register);
  app.post("/sessions", authenticate);

  /* Authenticated:
   * below routes should only be available for authenticated users
   */
  app.get(
    "/me",
    {
      onRequest: [JWTVerifier],
    },
    profile
  );
}
