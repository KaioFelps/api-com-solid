import { InvalidCredentialsError } from "@/services/errors/invalid-credentials-error";
import { AuthenticateFactory } from "@/services/factories/gen-authenticate-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function authenticate(req: FastifyRequest, rep: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateBodySchema.parse(req.body);

  try {
    const authenticateService = new AuthenticateFactory().execute();

    await authenticateService.execute({ email, password });
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return rep.status(400).send({ message: err.message });
    }

    throw err;
  }

  return rep.status(200).send();
}
