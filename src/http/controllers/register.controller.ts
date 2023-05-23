import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { RegisterAction } from "../../actions/register.action";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users.repository";
import { UserAlreadyExistsError } from "@/actions/errors/user-already-exist-error";

export async function register(req: FastifyRequest, rep: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, name, password } = registerBodySchema.parse(req.body);

  try {
    const usersRepository = new PrismaUsersRepository();
    const registerAction = new RegisterAction(usersRepository);

    await registerAction.execute({
      email,
      name,
      password,
    });
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      rep.status(409).send({ message: err.message });
    }

    rep.status(500).send();
  }

  return rep.status(201).send();
}
