import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Refresh (e2e)", async () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should generate a brand new token if refreshToken hasn't expired", async () => {
    await request(app.server).post("/users").send({
      name: "Kaio Felps",
      email: "kaiofelps@dev.com",
      password: "123456",
    });

    const authResponse = await request(app.server).post("/sessions").send({
      email: "kaiofelps@dev.com",
      password: "123456",
    });

    const cookies = authResponse.get("Set-Cookie");

    const response = await request(app.server)
      .patch("/token/refresh")
      .set("Cookie", cookies)
      .send()
      .expect(200);

    expect(response.body.token).toEqual(expect.any(String));

    expect(response.get("Set-Cookie")).toEqual([
      expect.stringContaining("refreshToken="),
    ]);
  });
});
