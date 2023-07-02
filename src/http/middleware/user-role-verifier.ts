import { FastifyReply, FastifyRequest } from "fastify";

export function userRoleVerfiier(roleToBeVerified: "ADMIN" | "MEMBER") {
  return async (req: FastifyRequest, rep: FastifyReply) => {
    const role = req.user.role;

    if (role !== roleToBeVerified) {
      return rep.status(401).send({
        message: "Unauthorized.",
      });
    }
  };
}
