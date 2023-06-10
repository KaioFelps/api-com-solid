import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins.repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CheckInService } from "./check-in-service";

describe("Check In Service", () => {
  let checkInRepository: InMemoryCheckInsRepository;
  let sut: CheckInService;

  beforeEach(() => {
    checkInRepository = new InMemoryCheckInsRepository();
    sut = new CheckInService(checkInRepository);
  });

  it("should check in", async () => {
    const { checkIn } = await sut.execute({
      gymId: "dsfds",
      userId: "uvf",
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
