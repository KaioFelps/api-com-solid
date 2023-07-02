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

    const { user } = await authenticateService.execute({ email, password });

    const token = await rep.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
        },
      }
    );

    const refreshToken = await rep.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
          /*
           * expira em 7 dias
           * um novo token é gerado a cada 10 minutos
           * para perder o token, o usuário precisa ficar 7 dias sem fazer nenhuma requisição para a aplicação
           */
          expiresIn: "7d",
        },
      }
    );

    return rep
      .status(200)
      .setCookie("refreshToken", refreshToken, {
        // disponibiliza esse token apenas no pacote http, não fica disponível no browser e, logo, não fica acessível para o front-end ou javascript.
        httpOnly: true,
        // rotas do dominio que poderão ter acesso ao cookie
        // / quer dizer que todo o back-end pode ler o valor do cookie
        path: "/",
        // diz se vai ser encriptado pelo https ou não
        // se sim, o back-end não vai ter acesso ao valor bruto em string do cookie
        secure: true,
        // faz com que só seja acessível para o back-end do mesmo site
        sameSite: true,
      })
      .send({
        token,
      });
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return rep.status(400).send({ message: err.message });
    }

    throw err;
  }
}
