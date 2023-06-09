import { UsersRepositoryInterface } from "@/repositories/users-repository";
import { compare } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { User } from "@prisma/client";

type AuthenticateServiceInput = {
  email: string;
  password: string;
};

type AuthenticateServiceOutput = {
  user: User;
};

export class AuthenticateService {
  constructor(private usersRepository: UsersRepositoryInterface) {}

  async execute({
    email,
    password,
  }: AuthenticateServiceInput): Promise<AuthenticateServiceOutput> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordMatch = await compare(password, user.password_hash);

    if (!doesPasswordMatch) {
      throw new InvalidCredentialsError();
    }

    return { user };
  }
}
