import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { registerAction } from "../actions/register.action";

export async function register(req: FastifyRequest, rep: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, name, password } = registerBodySchema.parse(req.body);

  try {
    await registerAction({ email, name, password });
  } catch (err) {
    rep.status(409).send(err);
  }

  return rep.status(201).send();
}
