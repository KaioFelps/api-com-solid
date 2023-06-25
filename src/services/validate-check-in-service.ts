import { CheckInsRepositoryInterface } from "@/repositories/check-ins-repository";
import { CheckIn } from "@prisma/client";
import { NotFoundError } from "./errors/not-found-error";

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

    checkIn.validated_at = new Date();

    await this.checkInsRepository.save(checkIn);

    return { checkIn };
  }
}
