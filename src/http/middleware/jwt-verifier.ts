import { FastifyReply, FastifyRequest } from "fastify";

export async function JWTVerifier(req: FastifyRequest, rep: FastifyReply) {
  try {
    await req.jwtVerify();
  } catch (e) {
    rep.status(401).send({
      message: "Unauthorized.",
    });
  }
}
