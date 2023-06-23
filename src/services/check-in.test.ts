import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins.repository";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CheckInService } from "./check-in-service";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gym.repository";
import { Decimal } from "@prisma/client/runtime/library";

describe("Check In Service", () => {
  let checkInRepository: InMemoryCheckInsRepository;
  let gymRepository: InMemoryGymsRepository;
  let sut: CheckInService;

  beforeEach(() => {
    checkInRepository = new InMemoryCheckInsRepository();
    gymRepository = new InMemoryGymsRepository();
    sut = new CheckInService(checkInRepository, gymRepository);

    gymRepository.create({
      id: "gym-01",
      title: "JavaScript Gym",
      description: "",
      latitude: -24.0112631,
      longitude: -52.3660119,
      phone: "",
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should check in", async () => {
    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -24.0112631,
      userLongitude: -52.3660119,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("shouldn't be possible to check in twice a day", async () => {
    vi.setSystemTime(new Date(2023, 0, 10, 13, 0, 0));

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -24.0112631,
      userLongitude: -52.3660119,
    });

    await expect(() =>
      sut.execute({
        gymId: "gym-01",
        userId: "user-01",
        userLatitude: -24.04701,
        userLongitude: -52.414592,
      })
    )
      .rejects.toBeInstanceOf(Error)
      .then((res) => console.log(res));
  });

  it("should be possible to check in more than once in different days", async () => {
    vi.setSystemTime(new Date(2023, 0, 10, 13, 0, 0, 0));

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -24.0112631,
      userLongitude: -52.3660119,
    });

    vi.setSystemTime(new Date(2023, 0, 11, 13, 0, 0, 0));

    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -24.0112631,
      userLongitude: -52.3660119,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("shouldn't be possible to check in on too distant gym", async () => {
    gymRepository.create({
      id: "gym-02",
      description: "",
      title: "Ruby Gym",
      phone: "",
      latitude: new Decimal(-24.0112631),
      longitude: new Decimal(-52.3660119),
    });

    const checkInPromise = sut.execute({
      gymId: "gym-02",
      userId: "user-01",
      userLatitude: -24.04701,
      userLongitude: -52.414592,
    });

    await expect(checkInPromise).rejects.toBeInstanceOf(Error);
  });
});
