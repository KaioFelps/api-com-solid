import { GymsRepositoryInterface } from "@/repositories/gyms-repository";
import { SearchGymsService } from "./search-gyms-service";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gym.repository";

let gymsRepository: GymsRepositoryInterface;
let sut: SearchGymsService;

describe("Search Gym Service", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymsService(gymsRepository);
  });

  it("should list gyms that satisfies a query", async () => {
    await gymsRepository.create({
      title: "Javascript Gym",
      id: "js-gym",
      latitude: -24.0112631,
      longitude: -52.3660119,
    });

    await gymsRepository.create({
      title: "Ruby Gym",
      id: "rb-gym",
      latitude: -24.0112631,
      longitude: -52.3660119,
    });

    await gymsRepository.create({
      title: "Rust Gym",
      id: "rs-gym",
      latitude: -24.0112631,
      longitude: -52.3660119,
    });

    const { gyms } = await sut.execute({
      query: "ruby",
    });

    expect(gyms).toHaveLength(1);

    expect(gyms).toEqual([expect.objectContaining({ title: "Ruby Gym" })]);
  });

  it("should be able to navigate through a paginated query", async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Ruby Gym ${i}°`,
        id: "rb-gym",
        latitude: -24.0112631,
        longitude: -52.3660119,
      });
    }

    const { gyms } = await sut.execute({
      query: "ruBy",
      page: 2,
    });

    expect(gyms).toHaveLength(2);

    expect(gyms).toEqual([
      expect.objectContaining({
        title: "Ruby Gym 21°",
      }),
      expect.objectContaining({
        title: "Ruby Gym 22°",
      }),
    ]);
  });
});
