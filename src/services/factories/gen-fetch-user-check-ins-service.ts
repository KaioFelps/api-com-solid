import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins.repository";
import { FetchUserCheckInsHistoryService } from "../fetch-user-check-ins-history-service";

export class FetchUserCheckInsFactory {
  execute() {
    const checkInsRepository = new PrismaCheckInsRepository();
    const fetchUserCheckInsService = new FetchUserCheckInsHistoryService(
      checkInsRepository
    );

    return fetchUserCheckInsService;
  }
}
