import request from "supertest";
import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import { createAndAuthenticateAnUser } from "@/utils/test/create-and-authenticate-an-user";
import { afterAll, beforeAll, describe, it } from "vitest";

describe("Create check-in (e2e)", async () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should create a check-in", async () => {
    const { token } = await createAndAuthenticateAnUser(app);

    const { id } = await prisma.gym.create({
      data: {
        title: "Ruby Gym",
        latitude: -24.0112631,
        longitude: -52.3660119,
      },
    });

    await request(app.server)
      .post(`/gyms/${id}/check-ins`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        latitude: -24.0112631,
        longitude: -52.3660119,
      })
      .expect(201);
  });
});
