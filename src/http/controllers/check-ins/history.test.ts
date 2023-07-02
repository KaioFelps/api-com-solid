import request from "supertest";
import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import { createAndAuthenticateAnUser } from "@/utils/test/create-and-authenticate-an-user";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("History (e2e)", async () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should list the history of check-ins", async () => {
    const { token } = await createAndAuthenticateAnUser(app);

    const { id } = await prisma.gym.create({
      data: {
        title: "Ruby Gym",
        latitude: -24.0112631,
        longitude: -52.3660119,
      },
    });

    const user = await prisma.user.findFirstOrThrow();

    await prisma.checkIn.createMany({
      data: [
        {
          gym_id: id,
          user_id: user.id,
        },
        {
          gym_id: id,
          user_id: user.id,
        },
        {
          gym_id: id,
          user_id: user.id,
        },
      ],
    });

    const response = await request(app.server)
      .get("/check-ins/history")
      .set("Authorization", `Bearer ${token}`)
      .send()
      .expect(200);

    expect(response.body.checkIns).toEqual([
      expect.objectContaining({
        gym_id: id,
        user_id: user.id,
      }),
      expect.objectContaining({
        gym_id: id,
        user_id: user.id,
      }),
      expect.objectContaining({
        gym_id: id,
        user_id: user.id,
      }),
    ]);
  });
});
