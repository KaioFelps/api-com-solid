import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins.repository";
import { FetchUserCheckInsHistoryService } from "./fetch-user-check-ins-history-service";
import { beforeEach, describe, expect, it } from "vitest";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: FetchUserCheckInsHistoryService;

describe("Fetch check-in history service", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new FetchUserCheckInsHistoryService(checkInsRepository);
  });

  it("should be able to fetch an user check-ins history", async () => {
    await checkInsRepository.create({
      gym_id: "gym-02",
      user_id: "user-01",
    });

    await checkInsRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    });

    const { checkIns } = await sut.execute({
      userId: "user-01",
    });

    expect(checkIns).toHaveLength(2);

    expect(checkIns).toEqual([
      expect.objectContaining({
        gym_id: "gym-02",
      }),
      expect.objectContaining({
        gym_id: "gym-01",
      }),
    ]);
  });

  it("should be able to fetch paginated check-ins history", async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInsRepository.create({
        user_id: "user-01",
        gym_id: `gym-${i > 9 ? i : "0" + i}`,
      });
    }

    const { checkIns } = await sut.execute({
      userId: "user-01",
      page: 2,
    });

    expect(checkIns).toHaveLength(2);

    expect(checkIns).toEqual([
      expect.objectContaining({
        gym_id: "gym-21",
      }),
      expect.objectContaining({
        gym_id: "gym-22",
      }),
    ]);
  });
});
