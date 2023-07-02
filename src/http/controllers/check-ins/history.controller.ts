import { FetchUserCheckInsFactory } from "@/services/factories/gen-fetch-user-check-ins-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function history(req: FastifyRequest, rep: FastifyReply) {
  const checkInHistoryQuerySchema = z.object({
    page: z.coerce.number().default(1),
  });

  const { page } = checkInHistoryQuerySchema.parse(req.query);
  const userId = req.user.sub;

  const fetchUserCheckInService = new FetchUserCheckInsFactory().execute();

  const { checkIns } = await fetchUserCheckInService.execute({
    page,
    userId,
  });

  return rep.status(200).send({
    checkIns,
  });
}
