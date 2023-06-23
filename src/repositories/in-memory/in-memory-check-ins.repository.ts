import { Prisma, CheckIn } from "@prisma/client";
import { CheckInsRepositoryInterface } from "../check-ins-repository";
import { randomUUID } from "node:crypto";
import dayjs from "dayjs";

export class InMemoryCheckInsRepository implements CheckInsRepositoryInterface {
  private items: CheckIn[] = [];

  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn: CheckIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      created_at: new Date(),
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
    };

    this.items.push(checkIn);

    return checkIn;
  }

  async findByUserIdOnDate(
    userId: string,
    date: Date
  ): Promise<CheckIn | null> {
    const startOfTheDay = dayjs(date).startOf("date");
    const endOfTheDay = dayjs(date).endOf("date");

    const checkInOnGivenDate = this.items.find((checkin) => {
      const checkInDate = dayjs(checkin.created_at);
      const isOnSameDate =
        checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay);

      return checkin.user_id === userId && isOnSameDate;
    });

    if (!checkInOnGivenDate) {
      return null;
    }

    return checkInOnGivenDate;
  }
}
