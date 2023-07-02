import request from "supertest";
import { app } from "@/app";
import { createAndAuthenticateAnUser } from "@/utils/test/create-and-authenticate-an-user";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Create gym (e2e)", async () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should create a gym", async () => {
    const { token } = await createAndAuthenticateAnUser(app, true);

    const response = await request(app.server)
      .post("/gyms/create")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Ruby Gym",
        description: "Ruby On Rails are welcome!",
        phone: "44999999999",
        latitude: -24.0112631,
        longitude: -52.3660119,
      });

    expect(response.statusCode).toEqual(201);
  });
});
