import fastify from "fastify";
import { usersRoutes } from "./http/controllers/users/routes";
import { GlobalErrorHandler } from "./services/errors/global-error-handler";
import fastifyJwt from "@fastify/jwt";
import { env } from "./env";
import { gymsRoutes } from "./http/controllers/gyms/routes";
import { checkInsRoutes } from "./http/controllers/check-ins/routes";

export const app = fastify();
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});

app.register(checkInsRoutes);
app.register(usersRoutes);
app.register(gymsRoutes);

app.setErrorHandler(GlobalErrorHandler);
