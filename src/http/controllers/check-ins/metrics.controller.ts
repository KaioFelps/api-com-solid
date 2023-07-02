import { GetUsersMetricsFactory } from "@/services/factories/gen-get-user-metrics-service";
import { FastifyReply, FastifyRequest } from "fastify";

export async function metrics(req: FastifyRequest, rep: FastifyReply) {
  const userId = req.user.sub;

  const getUserMetricService = new GetUsersMetricsFactory().execute();

  const { checkInsCount } = await getUserMetricService.execute({
    userId,
  });

  return rep.status(200).send({
    checkInsCount,
  });
}
