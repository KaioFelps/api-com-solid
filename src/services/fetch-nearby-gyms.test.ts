import { GymsRepositoryInterface } from "@/repositories/gyms-repository";
import { FetchNearbyGymsService } from "./fetch-nearby-gyms-service";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gym.repository";

let gymsRepository: GymsRepositoryInterface;
let sut: FetchNearbyGymsService;

describe("Fetch Nearby Gyms Service", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new FetchNearbyGymsService(gymsRepository);
  });

  it("should only show gyms in a ray of at max 100 meters", async () => {
    await gymsRepository.create({
      latitude: -24.0112631,
      longitude: -52.3660119,
      title: "Ruby Gym",
    });

    await gymsRepository.create({
      latitude: -24.04701,
      longitude: -52.414592,
      title: "Rust Gym",
    });

    const { gyms } = await sut.execute({
      userLatitude: -24.04701,
      userLongitude: -52.414591,
    });

    expect(gyms).toHaveLength(1);

    expect(gyms[0]).toEqual(
      expect.objectContaining({
        title: "Rust Gym",
      })
    );
  });
});
