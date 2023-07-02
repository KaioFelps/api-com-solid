import { ValidateCheckInFactory } from "@/services/factories/gen-validate-check-in-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function validate(req: FastifyRequest, rep: FastifyReply) {
  const validateCheckInParamsSchema = z.object({
    checkInId: z.string().uuid(),
  });

  const { checkInId } = validateCheckInParamsSchema.parse(req.params);

  const validateCheckInService = new ValidateCheckInFactory().execute();
  await validateCheckInService.execute({
    checkInId,
  });

  return rep.status(204).send();
}
