import { UsersRepositoryInterface } from "@/repositories/users-repository";
import { User } from "@prisma/client";
import { NotFoundError } from "./errors/not-found-error";

type GetUserProfileInput = {
  userId: string;
};

type GetUserProfileOutput = {
  user: User;
};

export class GetUserProfileService {
  constructor(private usersRepository: UsersRepositoryInterface) {}

  async execute({
    userId,
  }: GetUserProfileInput): Promise<GetUserProfileOutput> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new NotFoundError();
    }

    return { user };
  }
}
