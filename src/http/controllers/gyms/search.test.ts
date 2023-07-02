import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateAnUser } from "@/utils/test/create-and-authenticate-an-user";

describe("Search gym (e2e)", async () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to find a gym by a query", async () => {
    const { token } = await createAndAuthenticateAnUser(app, true);

    await request(app.server)
      .post("/gyms/create")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Ruby Gym",
        description: "Ruby On Rails are welcome!",
        phone: "44999999999",
        latitude: -24.0112631,
        longitude: -52.3660119,
      });

    await request(app.server)
      .post("/gyms/create")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Rust Gym",
        description: "Rustacceans!",
        phone: "44999999999",
        latitude: -24.0112631,
        longitude: -52.3660119,
      });

    const response = await request(app.server)
      .get("/gyms/search")
      .set("Authorization", `Bearer ${token}`)
      .query({
        page: 1,
        query: "rust",
      })
      .expect(200);

    expect(response.body.gyms).toHaveLength(1);

    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: "Rust Gym",
      }),
    ]);
  });
});
