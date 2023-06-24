import { CheckInsRepositoryInterface } from "@/repositories/check-ins-repository";
import { CheckIn } from "@prisma/client";

interface FetchUserCheckInsHistoryInput {
  userId: string;
  page?: number;
}

interface FetchUserCheckInsHistoryOutput {
  checkIns: CheckIn[];
}

export class FetchUserCheckInsHistoryService {
  constructor(private checkInsRepository: CheckInsRepositoryInterface) {}

  async execute({
    userId,
    page: _page,
  }: FetchUserCheckInsHistoryInput): Promise<FetchUserCheckInsHistoryOutput> {
    const page = _page ?? 1;
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page
    );

    return {
      checkIns,
    };
  }
}
