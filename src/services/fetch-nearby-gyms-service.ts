import { GymsRepositoryInterface } from "@/repositories/gyms-repository";
import { Gym } from "@prisma/client";

interface FetchNearbyGymsInput {
  userLatitude: number;
  userLongitude: number;
}

interface FetchNearbyGymsOutput {
  gyms: Gym[];
}

export class FetchNearbyGymsService {
  constructor(private gymsRepository: GymsRepositoryInterface) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbyGymsInput): Promise<FetchNearbyGymsOutput> {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    });

    return {
      gyms,
    };
  }
}
