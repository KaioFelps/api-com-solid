import { CheckInsRepositoryInterface } from "@/repositories/check-ins-repository";
import { GymsRepositoryInterface } from "@/repositories/gyms-repository";
import { CheckIn } from "@prisma/client";
import { NotFoundError } from "./errors/not-found-error";
import { getDistanceBetweenTwoCoordinates } from "@/utils/get-distance-between-two-coordinates";
import { MaxDistanceError } from "./errors/max-distance-error";
import { MaxNumberOfCheckInsError } from "./errors/max-number-of-check-ins.-error";

type CheckInServiceInput = {
  userId: string;
  gymId: string;
  userLongitude: number;
  userLatitude: number;
};

type CheckInServiceOutput = {
  checkIn: CheckIn;
};

export class CheckInService {
  constructor(
    private checkInRepository: CheckInsRepositoryInterface,
    private gymRepository: GymsRepositoryInterface
  ) {}

  async execute({
    gymId,
    userId,
    userLatitude,
    userLongitude,
  }: CheckInServiceInput): Promise<CheckInServiceOutput> {
    const gym = await this.gymRepository.findById(gymId);

    if (!gym) {
      throw new NotFoundError();
    }

    const distance = getDistanceBetweenTwoCoordinates(
      {
        latitude: userLatitude,
        longitude: userLongitude,
      },
      {
        latitude: Number(gym.latitude),
        longitude: Number(gym.longitude),
      }
    );

    // distance returns the value in km, we passing 0.1km, equals to 100m
    const MAX_DISTANCE_IN_KM = 0.1;

    if (distance > MAX_DISTANCE_IN_KM) {
      throw new MaxDistanceError();
    }

    const thereIsCheckInOnGivenDate =
      await this.checkInRepository.findByUserIdOnDate(userId, new Date());

    if (thereIsCheckInOnGivenDate) {
      throw new MaxNumberOfCheckInsError();
    }

    const checkIn = await this.checkInRepository.create({
      gym_id: gymId,
      user_id: userId,
    });

    return { checkIn };
  }
}
