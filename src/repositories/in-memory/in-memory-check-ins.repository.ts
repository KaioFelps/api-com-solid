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

  async findManyByUserId(userId: string, page: number): Promise<CheckIn[]> {
    const CHECK_INS_PER_PAGE = 20;
    const FILTER_OFFSET = (page - 1) * CHECK_INS_PER_PAGE;

    const checkIns = this.items
      .filter((checkin) => checkin.user_id === userId)
      .slice(FILTER_OFFSET, page * CHECK_INS_PER_PAGE);

    return checkIns;
  }

  async countByUserId(userId: string): Promise<number> {
    const checkInsAmount = this.items.filter(
      (checkin) => checkin.user_id === userId
    ).length;

    return checkInsAmount;
  }

  async findById(id: string): Promise<CheckIn | null> {
    const checkIn = this.items.find((checkin) => checkin.id === id);

    return checkIn ?? null;
  }

  async save(
    checkIn: Prisma.CheckInUncheckedCreateInput
  ): Promise<CheckIn | null> {
    const index = this.items.findIndex((item) => item.id === checkIn.id);

    if (index >= 0) {
      this.items[index] = checkIn as CheckIn;
    }

    return checkIn as CheckIn;
  }
}
