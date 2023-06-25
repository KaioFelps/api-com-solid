import { beforeEach, describe, expect, it } from "vitest";
import { ValidateCheckIns } from "./validate-check-in-service";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins.repository";
import { CheckInsRepositoryInterface } from "@/repositories/check-ins-repository";
import { NotFoundError } from "./errors/not-found-error";

let checkInsRepository: CheckInsRepositoryInterface;
let sut: ValidateCheckIns;

describe("Validate Check Ins Service", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new ValidateCheckIns(checkInsRepository);
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
});
