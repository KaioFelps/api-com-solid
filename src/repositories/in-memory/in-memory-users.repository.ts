import { Prisma, User } from "@prisma/client";
import { UsersRepositoryInterface } from "../users-repository";

export class InMemoryUsersRepository implements UsersRepositoryInterface {
  public users: User[] = [];

  async findByEmail(email: string) {
    const user = this.users.find((user) => {
      return user.email === email;
    });

    return user ?? null;
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: "1",
      name: data.name,
      email: data.email,
      created_at: new Date(),
      password_hash: data.password_hash,
    };

    this.users.push(user);
    return user;
  }
}