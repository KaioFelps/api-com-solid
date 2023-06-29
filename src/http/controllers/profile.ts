import { GetUserProfileFactory } from "@/services/factories/gen-get-user-profile-service";
import { FastifyReply, FastifyRequest } from "fastify";

export async function profile(req: FastifyRequest, rep: FastifyReply) {
  const getUserProfile = new GetUserProfileFactory().execute();
  const { user: _user } = await getUserProfile.execute({
    userId: req.user.sub,
  });

  const user = {
    ..._user,
    password_hash: undefined,
  };

  delete user.password_hash;

  return rep.status(200).send({
    user,
  });
}
