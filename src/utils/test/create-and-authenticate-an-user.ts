import { FastifyInstance } from "fastify";
import request from "supertest";

export async function createAndAuthenticateAnUser(app: FastifyInstance) {
  await request(app.server).post("/users").send({
    name: "Kaio Felps",
    email: "kaiofelps@dev.com",
    password: "123456",
  });

  const authResponse = await request(app.server).post("/sessions").send({
    email: "kaiofelps@dev.com",
    password: "123456",
  });

  return {
    token: authResponse.body.token,
  };
}
