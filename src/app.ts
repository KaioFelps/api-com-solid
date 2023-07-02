import fastify from "fastify";
import fastifyCookie from "@fastify/cookie";
import fastifyJwt from "@fastify/jwt";
import { usersRoutes } from "./http/controllers/users/routes";
import { GlobalErrorHandler } from "./services/errors/global-error-handler";
import { env } from "./env";
import { gymsRoutes } from "./http/controllers/gyms/routes";
import { checkInsRoutes } from "./http/controllers/check-ins/routes";

export const app = fastify();
app.register(fastifyCookie);

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    // quanto mais curto o tempo, mais tempo o usuário ficará logado
    // vai recriar o jwt após 10 minutos da última requisição, quando o usuário fizer uma nova requisição
    // continuação da lógica no arquivo authenticate.controller.ts
    expiresIn: "10m",
  },
  cookie: {
    cookieName: "refreshToken",
    // não é um cookie assinado
    // assinatura é quando fazemos uma assinatura na informação e depois fazemos um hash para validação
    signed: false,
  },
});

app.register(checkInsRoutes);
app.register(usersRoutes);
app.register(gymsRoutes);

app.setErrorHandler(GlobalErrorHandler);
