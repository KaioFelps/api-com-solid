import request from "supertest";
import { app } from "@/app";
import { createAndAuthenticateAnUser } from "@/utils/test/create-and-authenticate-an-user";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Nearby Gym (e2e)", async () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should find nearby gyms", async () => {
    const { token } = await createAndAuthenticateAnUser(app, true);

    await request(app.server)
      .post("/gyms/create")
      .set("Authorization", `Bearer ${token}`)
      .send({
        latitude: -24.0112631,
        longitude: -52.3660119,
        title: "Ruby Gym",
        description: "",
        phone: "44999999999",
      });

    await request(app.server)
      .post("/gyms/create")
      .set("Authorization", `Bearer ${token}`)
      .send({
        latitude: -24.04701,
        longitude: -52.414592,
        title: "Rust Gym",
        description: "",
        phone: "44999999999",
      });

    const response = await request(app.server)
      .get("/gyms/nearby")
      .query({
        latitude: -24.04701,
        longitude: -52.414592,
      })
      .set("Authorization", `Bearer ${token}`)
      .send()
      .expect(200);

    expect(response.body.gyms).toHaveLength(1);

    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: "Rust Gym",
      }),
    ]);
  });
});
