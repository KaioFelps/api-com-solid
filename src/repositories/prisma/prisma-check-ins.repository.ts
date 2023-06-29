import { Prisma, CheckIn } from "@prisma/client";
import { CheckInsRepositoryInterface } from "../check-ins-repository";
import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";

export class PrismaCheckInsRepository implements CheckInsRepositoryInterface {
  async findByUserIdOnDate(
    userId: string,
    date: Date
  ): Promise<CheckIn | null> {
    const startOfTheDay = dayjs(date).startOf("date");
    const endOfTheDay = dayjs(date).endOf("date");

    const checkInOnGivenDate = await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          // created at any moment between the start of the day or the end of the day
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate(),
        },
      },
    });

    return checkInOnGivenDate;
  }

  async findById(id: string): Promise<CheckIn | null> {
    const checkIn = await prisma.checkIn.findUnique({
      where: {
        id,
      },
    });

    return checkIn;
  }

  async findManyByUserId(userId: string, page: number): Promise<CheckIn[]> {
    const CHECK_INS_PER_PAGE = 20;
    const OFFSET = (page - 1) * CHECK_INS_PER_PAGE;

    const checkIns = await prisma.checkIn.findMany({
      where: {
        user_id: userId,
      },
      skip: OFFSET,
      take: CHECK_INS_PER_PAGE,
    });

    return checkIns;
  }

  async countByUserId(userId: string): Promise<number> {
    const amountOfCheckIns = await prisma.checkIn.count({
      where: {
        user_id: userId,
      },
    });

    return amountOfCheckIns;
  }

  async save(
    checkIn: Prisma.CheckInUncheckedCreateInput
  ): Promise<CheckIn | null> {
    const updatedCheckIn = await prisma.checkIn.update({
      where: {
        id: checkIn.id,
      },
      data: checkIn,
    });

    return updatedCheckIn;
  }

  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn = await prisma.checkIn.create({
      data,
    });

    return checkIn;
  }
}
