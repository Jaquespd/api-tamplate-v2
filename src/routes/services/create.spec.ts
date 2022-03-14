/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import { app } from "../../app";
import request from "supertest";

describe("Create Service", () => {
  it("Should be able to create a new service", async () => {
    const response = await request(app)
      .post("/services/")
      .set("Authorization", "Bearer dev admin")
      .send({
        title: "Title",
        subtitle: "Subtitle",
        description: "Description",
        city: "Natal",
        state: "RN",
        areaAvailability: ["Natal", "Parnamirim"],
        routeMap: "URL",
        price: 300,
        warning: "Warning",
        categories: ["Norte", "Sul"],
        hashtags: ["Nature", "Mar"],
        distance: 15,
        stops: 3,
        duration: 300,
        coverPhoto: "URL",
        location: ["1", "2"],
        isActive: true,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
  });

  // it("Should not be able to create an existing user", async () => {
  //   await request(app).post("/users").send({
  //     username: "test-integration-exist",
  //     email: "testIntegrationExisting@test.com.br",
  //     name: "Test Integration Exist User",
  //   });

  //   const response = await request(app).post("/users").send({
  //     username: "test-integration-exist",
  //     email: "testIntegrationExisting@test.com.br",
  //     name: "Test Integration Exist User",
  //   });

  //   expect(response.status).toBe(400);
  // });
});
