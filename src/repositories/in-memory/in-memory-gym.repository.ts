import {
  FindManyNearbyParams,
  GymsRepositoryInterface,
} from "@/repositories/gyms-repository";
import { getDistanceBetweenTwoCoordinates } from "@/utils/get-distance-between-two-coordinates";
import { Gym, Prisma } from "@prisma/client";
import { randomUUID } from "crypto";

export class InMemoryGymsRepository implements GymsRepositoryInterface {
  private items: Gym[] = [];

  async findById(id: string) {
    const gym = this.items.find((gym) => gym.id === id);

    if (!gym) {
      return null;
    }

    return gym;
  }

  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(Number(data.latitude)),
      longitude: new Prisma.Decimal(Number(data.longitude)),
      created_at: new Date(),
    };

    this.items.push(gym);

    return gym;
  }

  async searchMany(query: string, page: number): Promise<Gym[]> {
    const GYMS_PER_PAGE = 20;
    const QUERY_OFFSET = (page - 1) * GYMS_PER_PAGE;

    const gyms = this.items
      .filter((gym) => gym.title.toLowerCase().includes(query.toLowerCase()))
      .slice(QUERY_OFFSET, page * GYMS_PER_PAGE);

    return gyms;
  }

  async findManyNearby({
    latitude,
    longitude,
  }: FindManyNearbyParams): Promise<Gym[]> {
    const gyms = this.items.filter((gym) => {
      const distance = getDistanceBetweenTwoCoordinates(
        {
          latitude,
          longitude,
        },
        {
          latitude: Number(gym.latitude),
          longitude: Number(gym.longitude),
        }
      );

      const MAX_DISTANCE_ALLOWED = 0.1;

      return distance <= MAX_DISTANCE_ALLOWED;
    });

    return gyms;
  }
}
