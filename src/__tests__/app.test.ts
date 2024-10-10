import request from "supertest"
import app from "../index"

describe("GET /", () => {
  it("should return a 200 status and a message", async () => {
    const res = await request(app).get("/")
    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty("msg", "Server is up and running")
  })
})
