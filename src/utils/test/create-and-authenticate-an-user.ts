import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { FastifyInstance } from "fastify";
import request from "supertest";

export async function createAndAuthenticateAnUser(
  app: FastifyInstance,
  isAdmin: boolean = false
) {
  const hashingRounds = 4;

  await prisma.user.create({
    data: {
      name: "Kaio Felps",
      email: "kaiofelps@dev.com",
      password_hash: await hash("123456", hashingRounds),
      role: isAdmin ? "ADMIN" : "MEMBER",
    },
  });

  const authResponse = await request(app.server).post("/sessions").send({
    email: "kaiofelps@dev.com",
    password: "123456",
  });

  return {
    token: authResponse.body.token,
  };
}
