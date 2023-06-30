import request from "supertest";
import { app } from "@/app";
import { beforeAll, describe, expect, it } from "vitest";

describe("Register (e2e)", async () => {
  beforeAll(async () => {
    await app.ready();
  });

  beforeAll(async () => {
    await app.close();
  });

  it("should be able to register", async () => {
    const response = await request(app.server).post("/users").send({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    console.log(response);

    expect(response.statusCode).toEqual(201);
  });
});
