import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms.repository";
import { FetchNearbyGymsService } from "../fetch-nearby-gyms-service";

export class FetchNearbyGymsFactory {
  execute() {
    const gymsRepository = new PrismaGymsRepository();
    const fetchNearbyGymsService = new FetchNearbyGymsService(gymsRepository);

    return fetchNearbyGymsService;
  }
}
