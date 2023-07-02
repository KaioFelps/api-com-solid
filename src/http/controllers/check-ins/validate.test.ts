import request from "supertest";
import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import { createAndAuthenticateAnUser } from "@/utils/test/create-and-authenticate-an-user";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Validate check-in (e2e)", async () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should validate a check-in", async () => {
    const { token } = await createAndAuthenticateAnUser(app);

    const { id } = await prisma.gym.create({
      data: {
        title: "Ruby Gym",
        latitude: -24.0112631,
        longitude: -52.3660119,
      },
    });

    const user = await prisma.user.findFirstOrThrow();

    let checkIn = await prisma.checkIn.create({
      data: {
        gym_id: id,
        user_id: user.id,
      },
    });

    await request(app.server)
      .patch(`/check-ins/${checkIn.id}/validate`)
      .set("Authorization", `Bearer ${token}`)
      .send()
      .expect(204);

    checkIn = await prisma.checkIn.findUniqueOrThrow({
      where: {
        id: checkIn.id,
      },
    });

    expect(checkIn.validated_at).toEqual(expect.any(Date));
  });
});
