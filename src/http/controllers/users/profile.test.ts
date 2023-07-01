import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Profile (e2e)", async () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to get an user's profile", async () => {
    await request(app.server).post("/users").send({
      name: "Kaio Felps",
      email: "kaiofelps@dev.com",
      password: "123456",
    });

    const authResponse = await request(app.server).post("/sessions").send({
      email: "kaiofelps@dev.com",
      password: "123456",
    });

    const profileResponse = await request(app.server)
      .get("/me")
      .set("Authorization", `Bearer ${authResponse.body.token}`)
      .send();

    console.log(authResponse.body.token);
    expect(profileResponse.statusCode).toEqual(200);
    expect(profileResponse.body.user).toEqual(
      expect.objectContaining({
        email: "kaiofelps@dev.com",
      })
    );
  });
});
