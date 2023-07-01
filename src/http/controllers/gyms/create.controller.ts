import { CreateGymFactory } from "@/services/factories/gen-create-gym-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(req: FastifyRequest, rep: FastifyReply) {
  const createNewGymSchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine((value) => {
      // a latitude precisa ser sempre maior ou igual a 90 (positivo ou negativo)
      return Math.abs(value) <= 90;
    }),
    longitude: z.number().refine((value) => {
      // a latitude precisa ser sempre maior ou igual a 180 (positivo ou negativo)
      return Math.abs(value) <= 180;
    }),
  });

  const { description, latitude, longitude, phone, title } =
    createNewGymSchema.parse(req.body);

  const createNewGymService = new CreateGymFactory().execute();

  await createNewGymService.execute({
    description,
    latitude,
    longitude,
    phone,
    title,
  });
}
