import { UsersRepositoryInterface } from "@/repositories/users-repository";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/user-already-exist-error";

type RegisterActionType = {
  email: string;
  password: string;
  name: string;
};

export class RegisterAction {
  constructor(private UsersRepository: UsersRepositoryInterface) {}

  async execute({ email, name, password }: RegisterActionType) {
    const userWithSameEmail = await this.UsersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const hashingRounds = 4;
    const passwordHash = await hash(password, hashingRounds);

    await this.UsersRepository.create({
      email,
      name,
      password_hash: passwordHash,
    });
  }
}
