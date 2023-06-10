import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users.repository";
import { RegisterService } from "../register-service";

export class RegisterFactory {
  execute() {
    const usersRepository = new PrismaUsersRepository();
    const registerService = new RegisterService(usersRepository);

    return registerService;
  }
}
