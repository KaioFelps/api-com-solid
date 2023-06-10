import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users.repository";
import { beforeEach, describe, expect, it } from "vitest";
import { GetUserProfileService } from "./get-user-profile-service";
import { hash } from "bcryptjs";
import { NotFoundError } from "./errors/not-found-error";

describe("Get User Profile Service", () => {
  let usersRepository: InMemoryUsersRepository;
  let sut: GetUserProfileService;

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileService(usersRepository);
  });

  it("should get users profile by id", async () => {
    const { id } = await usersRepository.create({
      email: "johndoe@gmail.com",
      name: "John Doe",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({ userId: id });

    expect(user.name).toEqual("John Doe");
  });

  it("shouldn't return any profile if wrong id", async () => {
    const getProfilePromise = sut.execute({
      userId: "anythingthatdoesntexisthere",
    });

    await expect(getProfilePromise).rejects.toBeInstanceOf(NotFoundError);
  });
});
