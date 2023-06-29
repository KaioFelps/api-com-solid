import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins.repository";
import { ValidateCheckInService } from "../validate-check-in-service";

export class ValidateCheckInFactory {
  execute() {
    const checkInsRepository = new PrismaCheckInsRepository();
    const validateCheckInService = new ValidateCheckInService(
      checkInsRepository
    );

    return validateCheckInService;
  }
}
