import { FetchNearbyGymsFactory } from "@/services/factories/gen-fetch-nearby-gyms-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function nearby(req: FastifyRequest, rep: FastifyReply) {
  const nearbyGymsBodySchema = z.object({
    latitude: z.number().refine((value) => {
      // a latitude precisa ser sempre maior ou igual a 90 (positivo ou negativo)
      return Math.abs(value) <= 90;
    }),
    longitude: z.number().refine((value) => {
      // a latitude precisa ser sempre maior ou igual a 180 (positivo ou negativo)
      return Math.abs(value) <= 180;
    }),
  });

  const { latitude, longitude } = nearbyGymsBodySchema.parse(req.body);

  const fetchNearbyGymsService = new FetchNearbyGymsFactory().execute();

  const { gyms } = await fetchNearbyGymsService.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  });

  return rep.status(200).send({
    gyms,
  });
}
