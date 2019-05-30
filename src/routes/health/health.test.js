const request = require("supertest");

const { app } = require("../../index.js");

describe("tests for the health check endpoint", () => {
  it("returns a 200", async () => {
    await request(app)
      .get("/health")
      .expect(200)
  });
});
