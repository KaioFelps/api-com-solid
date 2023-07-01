import fastify from "fastify";
import { usersRoutes } from "./http/controllers/users/routes";
import { GlobalErrorHandler } from "./services/errors/global-error-handler";
import fastifyJwt from "@fastify/jwt";
import { env } from "./env";

export const app = fastify();
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});
app.register(usersRoutes);

app.setErrorHandler(GlobalErrorHandler);
