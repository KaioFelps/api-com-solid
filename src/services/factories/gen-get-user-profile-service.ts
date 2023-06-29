import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users.repository";
import { GetUserProfileService } from "../get-user-profile-service";

export class GetUserProfileFactory {
  execute() {
    const usersRepository = new PrismaUsersRepository();
    const getUserProfileService = new GetUserProfileService(usersRepository);

    return getUserProfileService;
  }
}
