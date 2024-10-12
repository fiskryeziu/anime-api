import request from "supertest"
import express from "express"
import { getAll } from "../controllers/animeController"
import { scrapeAnime } from "../services/animeScraper"

const app = express()
app.get("/api/anime/all", getAll)

jest.mock("../services/animeScraper.ts")

describe("GET /api/anime/all", () => {
  it("should return a 200 status and scrape data", async () => {
    const scrapeData = {
      spotlight: [
        {
          imgSrc: "imgsrc",
          spotlightRanking: "rank",
          details: {
            type: "TV",
            duration: "minute",
            date: "date",
            quality: "HD",
            captions: "100",
            dubEp: "99",
            watchUrl: "urlWatch",
            detailsUrl: "detailsUrl",
          },
        },
      ],
    }

    ;(scrapeAnime as jest.Mock).mockResolvedValueOnce(scrapeData)

    const response = await request(app).get("/api/anime/all")

    expect(response.status).toBe(200)
    expect(response.body).toEqual(scrapeData)
  })

  it("should return a 400 status and error message if scrapeAnime throws an error", async () => {
    const errorMessage = "Failed to fetch data"

    ;(scrapeAnime as jest.Mock).mockRejectedValueOnce(new Error(errorMessage))

    const response = await request(app).get("/api/anime/all")

    expect(response.status).toBe(400)
    expect(response.body).toEqual({ message: errorMessage })
  })
})
