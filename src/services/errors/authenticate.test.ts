import { describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users.repository";
import { AuthenticateService } from "../authenticate-service";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "./invalid-credentials-error";

describe("Authenticate Services", () => {
  it("should be able to authenticate", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateService(usersRepository);
    // sut => system under testing

    const email = "johndoe@gmail.com";

    await usersRepository.create({
      email,
      name: "John Doe",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      email,
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("shouldn't authenticate wrong email accounts", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateService(usersRepository);

    const email = "johndoe@gmail.com";

    const authenticationPromise = sut.execute({
      email,
      password: "123456",
    });

    await expect(authenticationPromise).rejects.toBeInstanceOf(
      InvalidCredentialsError
    );
  });

  it("shouldn't authenticate wrong password login", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateService(usersRepository);

    const email = "johndoe@gmail.com";

    await usersRepository.create({
      email,
      name: "John Doe",
      password_hash: await hash("123456", 6),
    });

    const authenticationPromise = sut.execute({
      email,
      password: "123456J",
    });

    await expect(authenticationPromise).rejects.toBeInstanceOf(
      InvalidCredentialsError
    );
  });
});
