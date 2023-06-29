import "@fastify/jwt";

declare module "@fastify/jwt" {
  export interface FastifyJWT {
    payload: {}; // não botamos nada no payload
    user: {
      sub: string;
    };
  }
}
