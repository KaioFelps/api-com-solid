import { JWTVerifier } from "@/http/middleware/jwt-verifier";
import { FastifyInstance } from "fastify";
import { create } from "./create.controller";
import { validate } from "./validate.controller";
import { history } from "./history.controller";
import { metrics } from "./metrics.controller";
import { userRoleVerfiier } from "@/http/middleware/user-role-verifier";

export async function checkInsRoutes(app: FastifyInstance) {
  // hooks are the same as middlewares, fastify just names it differently
  app.addHook("onRequest", JWTVerifier);

  app.get("/check-ins/history", history);
  app.get("/check-ins/metrics", metrics);

  app.post("/gyms/:gymId/check-ins", create);
  app.patch(
    "/check-ins/:checkInId/validate",
    {
      onRequest: [userRoleVerfiier("ADMIN")],
    },
    validate
  );
}
