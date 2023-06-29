import { GetUserMetricsService } from "../get-user-metrics-service";
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins.repository";

export class GetUsersMetricsFactory {
  execute() {
    const checkInsRepository = new PrismaCheckInsRepository();
    const getUsersMetricsService = new GetUserMetricsService(
      checkInsRepository
    );

    return getUsersMetricsService;
  }
}
