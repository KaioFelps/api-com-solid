import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins.repository";
import { CheckInService } from "../check-in-service";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms.repository";

export class CheckInFactory {
  execute() {
    const checkInsRepository = new PrismaCheckInsRepository();
    const gymsRepository = new PrismaGymsRepository();

    const checkInService = new CheckInService(
      checkInsRepository,
      gymsRepository
    );

    return checkInService;
  }
}
