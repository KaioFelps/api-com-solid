import { CheckInFactory } from "@/services/factories/gen-check-in-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(req: FastifyRequest, rep: FastifyReply) {
  const createCheckInBodySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  const createCheckInParamsSchema = z.object({
    gymId: z.string().uuid(),
  });

  const { latitude, longitude } = createCheckInBodySchema.parse(req.body);
  const { gymId } = createCheckInParamsSchema.parse(req.params);

  const userId = req.user.sub;

  const checkInService = new CheckInFactory().execute();
  await checkInService.execute({
    gymId,
    userId,
    userLatitude: latitude,
    userLongitude: longitude,
  });

  return rep.status(201).send();
}
