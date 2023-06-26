import { CheckInsRepositoryInterface } from "@/repositories/check-ins-repository";
import { CheckIn } from "@prisma/client";
import { NotFoundError } from "./errors/not-found-error";
import dayjs from "dayjs";
import { ExpiredCheckInsError } from "./errors/expired-check-ins-error";

interface ValidateCheckInsInput {
  checkInId: string;
}

interface ValidateCheckInsOutput {
  checkIn: CheckIn;
}

export class ValidateCheckIns {
  constructor(private checkInsRepository: CheckInsRepositoryInterface) {}

  async execute({
    checkInId,
  }: ValidateCheckInsInput): Promise<ValidateCheckInsOutput> {
    const checkIn = await this.checkInsRepository.findById(checkInId);

    if (!checkIn) {
      throw new NotFoundError();
    }

    const currentDate = dayjs(new Date());
    const checkInCreationDate = dayjs(checkIn.created_at);

    const diffInMsBetweenNowAndCheckInCreationDate =
      currentDate.diff(checkInCreationDate);

    const TwentyMinutesInMs = 1000 * 60 * 20;

    if (diffInMsBetweenNowAndCheckInCreationDate > TwentyMinutesInMs) {
      throw new ExpiredCheckInsError();
    }

    checkIn.validated_at = new Date();

    await this.checkInsRepository.save(checkIn);

    return { checkIn };
  }
}
