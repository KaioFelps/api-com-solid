import { SearchGymsFactory } from "@/services/factories/gen-search-gyms-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function search(req: FastifyRequest, rep: FastifyReply) {
  const searchGymsQuerySchema = z.object({
    query: z.string(),
    page: z.coerce.number().default(1),
  });

  const { page, query } = searchGymsQuerySchema.parse(req.query);

  const searchGymsService = new SearchGymsFactory().execute();

  const { gyms } = await searchGymsService.execute({
    query,
    page,
  });

  return rep.status(200).send({
    gyms,
  });
}
