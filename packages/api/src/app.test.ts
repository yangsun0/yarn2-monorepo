import request = require("supertest");
import app from "./app";

test("mydata API should return success", async () => {
  const res = await request(app).get("/api/mydata");
  expect(res.statusCode).toBe(200);
  expect(res.text).toBe('{"text":"hello world 1"}');
});
