import { Gym } from "@prisma/client";
import { GymsRepositoryInterface } from "@/repositories/gyms-repository";

type CreateGymInput = {
  title: string;
  description: string | null;
  phone: string | null;
  latitude: number;
  longitude: number;
};

type CreateGymOutput = {
  gym: Gym;
};

export class CreateGymService {
  constructor(private GymsRepository: GymsRepositoryInterface) {}

  async execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: CreateGymInput): Promise<CreateGymOutput> {
    const gym = await this.GymsRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude,
    });

    return {
      gym,
    };
  }
}
