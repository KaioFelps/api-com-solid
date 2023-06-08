import { UsersRepositoryInterface } from "@/repositories/users-repository";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/user-already-exist-error";
import { User } from "@prisma/client";

type RegisterServiceType = {
  email: string;
  password: string;
  name: string;
};

type RegisterServiceResponse = {
  user: User;
};

export class RegisterService {
  constructor(private UsersRepository: UsersRepositoryInterface) {}

  async execute({
    email,
    name,
    password,
  }: RegisterServiceType): Promise<RegisterServiceResponse> {
    const userWithSameEmail = await this.UsersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const hashingRounds = 4;
    const passwordHash = await hash(password, hashingRounds);

    const user = await this.UsersRepository.create({
      email,
      name,
      password_hash: passwordHash,
    });

    return {
      user,
    };
  }
}
