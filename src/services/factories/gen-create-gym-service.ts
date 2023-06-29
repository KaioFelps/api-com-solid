import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms.repository";
import { CreateGymService } from "../create-gym-service";

export class CreateGymFactory {
  execute() {
    const gymsRepository = new PrismaGymsRepository();
    const createGymService = new CreateGymService(gymsRepository);

    return createGymService;
  }
}
