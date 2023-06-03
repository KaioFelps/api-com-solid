import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users.repository";
import { UserAlreadyExistsError } from "@/services/errors/user-already-exist-error";
import { RegisterService } from "@/services/register-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function register(req: FastifyRequest, rep: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, name, password } = registerBodySchema.parse(req.body);

  try {
    const usersRepository = new PrismaUsersRepository();
    const registerService = new RegisterService(usersRepository);

    await registerService.execute({
      email,
      name,
      password,
    });
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      rep.status(409).send({ message: err.message });
    }

    throw err; // não vou tratar o erro aqui, uma camada acima é quem vai tratar o erro tacado daqui
  }

  return rep.status(201).send();
}
