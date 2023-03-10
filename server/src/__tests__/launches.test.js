const request = require("supertest");
const app = require("../app");

describe("TEST GET /launches", () => {
  test("It should responed with 200 status code", async () => {
    await request(app).get("/api/v1/launches").expect(200);
  });
});

describe("TEST POST /launches", () => {
  test("It should responed with 201 status code and to return json", async () => {
    await request(app)
      .post("/api/v1/launches")
      .send({
        mission: "test",
        rocket: "test",
        target: "test",
        launchDate: "January 4, 2028 ",
      })
      .expect("Content-Type", /json/)
      .expect(201);
  });

  test("It should catch missing required properties", async () => {
    const response = await request(app)
      .post("/api/v1/launches")
      .send({
        mission: "test",
        rocket: "test",
        target: "test",
        // launchDate: "January 4, 2028 ",
      })
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: "Missing launch property",
    });
  });

  test("It should catch invalid dates", async () => {
    const response = await request(app)
      .post("/api/v1/launches")
      .send({
        mission: "test",
        rocket: "test",
        target: "test",
        launchDate: "not a dtae",
      })
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: "Date is invalid format",
    });
  });
});
