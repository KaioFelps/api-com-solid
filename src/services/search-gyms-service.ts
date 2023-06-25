import { GymsRepositoryInterface } from "@/repositories/gyms-repository";
import { Gym } from "@prisma/client";

interface SearchGymsInput {
  query: string;
  page?: number;
}
interface SearchGymsOutput {
  gyms: Gym[];
}

export class SearchGymsService {
  constructor(private gymsRepository: GymsRepositoryInterface) {}

  async execute({ query, page }: SearchGymsInput): Promise<SearchGymsOutput> {
    const gyms = await this.gymsRepository.searchMany(query, page ?? 1);

    return { gyms };
  }
}
