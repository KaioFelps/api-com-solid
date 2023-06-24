import { CheckInsRepositoryInterface } from "@/repositories/check-ins-repository";

interface GetUserMetricsInput {
  userId: string;
}

interface GetUserMetricsOutput {
  checkInsCount: number;
}

export class GetUserMetricsService {
  constructor(private checkInRepository: CheckInsRepositoryInterface) {}

  async execute({
    userId,
  }: GetUserMetricsInput): Promise<GetUserMetricsOutput> {
    const checkInsCount: number = await this.checkInRepository.countByUserId(
      userId
    );

    return {
      checkInsCount,
    };
  }
}
