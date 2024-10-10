import request from "supertest"
import { app, startServer } from "../index"

let server: any

beforeAll((done) => {
  server = startServer() // Start the server before tests
  done()
})

afterAll((done) => {
  server.close(done) // Close the server after tests
})
describe("GET /", () => {
  it("should return a 200 status and a message", async () => {
    const res = await request(app).get("/")
    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty("msg", "Server is up and running")
  })
})
