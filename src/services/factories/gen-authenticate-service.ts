import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users.repository";
import { AuthenticateService } from "../authenticate-service";

export class AuthenticateFactory {
  execute() {
    const usersRepository = new PrismaUsersRepository();
    const authenticateService = new AuthenticateService(usersRepository);

    return authenticateService;
  }
}
