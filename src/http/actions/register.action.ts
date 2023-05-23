import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

type RegisterActionType = {
  email: string;
  password: string;
  name: string;
};

export class RegisterAction {
  constructor(private UsersRepository: any) {
    // private userrepository é o mesmo que receber o userrepository e colocá-lo como this.usersRepository = usersRepository
  }

  async execute({ email, name, password }: RegisterActionType) {
    const userWithSameEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userWithSameEmail) {
      throw new Error("E-mail já cadastrado.");
    }

    const hashingRounds = 4;
    const passwordHash = await hash(password, hashingRounds);

    const prismaUsersRepository = new this.UsersRepository();

    await prismaUsersRepository.create({
      email,
      name,
      password_hash: passwordHash,
    });
  }
}
