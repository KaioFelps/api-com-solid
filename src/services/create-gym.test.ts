import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gym.repository";
import { CreateGymService } from "./create-gym-service";
import { beforeEach, describe, expect, it } from "vitest";

let gymsRepository: InMemoryGymsRepository;
let sut: CreateGymService;

describe("Create Gym Service", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new CreateGymService(gymsRepository);
  });

  it("should be able to create a gym", async () => {
    const { gym } = await sut.execute({
      title: "JavaScript Gym",
      latitude: -24.0112631,
      longitude: -52.3660119,
      description: null,
      phone: null,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
