const request = require("supertest");
const app = require("../app");
const { mongoConnect } = require("../services/db");

describe("TEST GET /api/v1/planets", () => {
  beforeAll(async () => {
    await mongoConnect();
  });

  test("Should responed with 200 status code", async () => {
    const response = await request(app).get("/api/v1/planets").expect(200);

    expect.arrayContaining(response.body);
  });
});
