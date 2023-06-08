import { describe, expect, it } from "vitest";
import { RegisterService } from "../register-service";
import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users.repository";
import { UserAlreadyExistsError } from "./user-already-exist-error";

describe("Register Services", async () => {
  it("should hash user password upon registration", async () => {
    const registerService = new RegisterService(new InMemoryUsersRepository());

    const { user } = await registerService.execute({
      email: "johndoe@example.com",
      name: "john doe",
      password: "123456",
    });

    const hasPasswordBeenCorrectlyHashed = await compare(
      "123456",
      user.password_hash
    );

    expect(hasPasswordBeenCorrectlyHashed).toBe(true);
  });

  it("shouldn't let register new user with already existing email", async () => {
    const email = "johndoe@gmail.com";

    const registerService = new RegisterService(new InMemoryUsersRepository());

    await registerService.execute({
      email,
      name: "John Doe",
      password: "123456",
    });

    // expect com promisses precisam do await
    await expect(async () => {
      await registerService.execute({
        email,
        name: "Marianny",
        password: "123456",
      });
    }).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });

  it("should register an user", async () => {
    const registerService = new RegisterService(new InMemoryUsersRepository());

    const { user } = await registerService.execute({
      email: "johndoe@example.com",
      name: "john doe",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });
});
