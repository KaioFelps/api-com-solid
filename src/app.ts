import fastify from "fastify";
import { routes } from "./http/routes";
import { GlobalErrorHandler } from "./services/errors/global-error-handler";

export const app = fastify();
app.register(routes);

app.setErrorHandler(GlobalErrorHandler);
