import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

type RegisterAction = {
  email: string;
  password: string;
  name: string;
};

export async function registerAction({
  email,
  name,
  password,
}: RegisterAction) {
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

  await prisma.user.create({
    data: {
      email,
      name,
      password_hash: passwordHash,
    },
  });
}
