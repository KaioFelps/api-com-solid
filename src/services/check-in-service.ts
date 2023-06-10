import { CheckInsRepositoryInterface } from "@/repositories/check-ins-repository";
import { CheckIn } from "@prisma/client";

type CheckInServiceInput = {
  userId: string;
  gymId: string;
};

type CheckInServiceOutput = {
  checkIn: CheckIn;
};

export class CheckInService {
  constructor(private checkInRepository: CheckInsRepositoryInterface) {}

  async execute({
    gymId,
    userId,
  }: CheckInServiceInput): Promise<CheckInServiceOutput> {
    const checkIn = await this.checkInRepository.create({
      gym_id: gymId,
      user_id: userId,
    });

    return { checkIn };
  }
}
