import request from "supertest"
import express from "express"

const app = express()

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Server is up and running" })
})

describe("GET /", () => {
  it("should return a 200 status and a message", async () => {
    const response = await request(app).get("/")

    expect(response.status).toBe(200)

    expect(response.body).toEqual({ msg: "Server is up and running" })
  })
})
