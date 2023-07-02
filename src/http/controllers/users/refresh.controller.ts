import { FastifyReply, FastifyRequest } from "fastify";

export async function refresh(req: FastifyRequest, rep: FastifyReply) {
  // ao invés de olhar o header Authorization e afins para validar a autenticação, o método onlyCookie faz com que procure apenas nos cookies da requisição (o nosso refreshToken)

  // se o código depois disso continuar, é porque o cookie (do REFRESH token) existe e ainda não expirou, logo, podemos renová-lo
  await req.jwtVerify({ onlyCookie: true });

  const token = await rep.jwtSign(
    {},
    {
      sign: {
        sub: req.user.sub,
      },
    }
  );

  const refreshToken = await rep.jwtSign(
    {},
    {
      sign: {
        sub: req.user.sub,
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
    .send({ token });
}
