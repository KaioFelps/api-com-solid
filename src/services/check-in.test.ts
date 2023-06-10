import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins.repository";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CheckInService } from "./check-in-service";

describe("Check In Service", () => {
  let checkInRepository: InMemoryCheckInsRepository;
  let sut: CheckInService;

  beforeEach(() => {
    checkInRepository = new InMemoryCheckInsRepository();
    sut = new CheckInService(checkInRepository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should check in", async () => {
    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("shouldn't be possible to check in twice a day", async () => {
    vi.setSystemTime(new Date(2023, 0, 10, 13, 0, 0, 0));

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
    });

    const secondCheckInPromise = sut.execute({
      gymId: "gym-01",
      userId: "user-01",
    });

    await expect(secondCheckInPromise).rejects.toBeInstanceOf(Error);
  });

  it("should be possible to check in more than once in different days", async () => {
    vi.setSystemTime(new Date(2023, 0, 10, 13, 0, 0, 0));

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
    });

    vi.setSystemTime(new Date(2023, 0, 11, 13, 0, 0, 0));

    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
