import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ValidateCheckIns } from "./validate-check-in-service";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins.repository";
import { CheckInsRepositoryInterface } from "@/repositories/check-ins-repository";
import { NotFoundError } from "./errors/not-found-error";
import { ExpiredCheckInsError } from "./errors/expired-check-ins-error";

let checkInsRepository: CheckInsRepositoryInterface;
let sut: ValidateCheckIns;

describe("Validate Check Ins Service", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new ValidateCheckIns(checkInsRepository);

    vi.useFakeTimers();
  });

  afterEach(async () => {
    vi.useRealTimers();
  });

  it("should validate a check in", async () => {
    const { id } = await checkInsRepository.create({
      user_id: "user-01",
      gym_id: "user-02",
    });

    const { checkIn } = await sut.execute({
      checkInId: id,
    });

    expect(checkIn.validated_at).toEqual(expect.any(Date));
  });

  it("should not validate an inexistent check in", async () => {
    const invalidValidationPromise = sut.execute({
      checkInId: "inexistent-id",
    });

    await expect(invalidValidationPromise).rejects.toBeInstanceOf(
      NotFoundError
    );
  });

  it("should not validate a check-in after 20 minutes of creation", async () => {
    vi.setSystemTime(new Date(2023, 5, 26, 18, 49, 0, 0));

    const createdCheckIn = await checkInsRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    });

    const TwentyOneMinutes = 1000 * 60 * 21;
    vi.advanceTimersByTime(TwentyOneMinutes);

    const validateCheckInPromise = sut.execute({
      checkInId: createdCheckIn.id,
    });

    expect(validateCheckInPromise).rejects.toBeInstanceOf(ExpiredCheckInsError);
  });
});
