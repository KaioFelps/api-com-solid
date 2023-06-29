import { Gym, Prisma } from "@prisma/client";
import {
  FindManyNearbyParams,
  GymsRepositoryInterface,
} from "../gyms-repository";
import { prisma } from "@/lib/prisma";

export class PrismaGymsRepository implements GymsRepositoryInterface {
  async findById(gymId: string): Promise<Gym | null> {
    const gym = await prisma.gym.findUnique({
      where: {
        id: gymId,
      },
    });

    return gym;
  }

  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    const gym = await prisma.gym.create({
      data,
    });

    return gym;
  }

  async searchMany(query: string, page: number): Promise<Gym[]> {
    const GYMS_PER_PAGE = 20;
    const OFFSET = (page - 1) * GYMS_PER_PAGE;

    const gyms = await prisma.gym.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      take: GYMS_PER_PAGE,
      skip: OFFSET,
    });

    return gyms;
  }

  async findManyNearby({
    latitude,
    longitude,
  }: FindManyNearbyParams): Promise<Gym[]> {
    const MAX_DISTANCE_ALLOWED = 0.1;

    const gymsNearby = await prisma.$queryRaw<Gym[]>`
    SELECT * from gyms
    WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= ${MAX_DISTANCE_ALLOWED}
    `;

    return gymsNearby;
  }
}
