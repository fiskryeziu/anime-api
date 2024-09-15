import { Request, Response } from "express"
import { scrapeAnime } from "../services/animeScraper"

const getAll = async (req: Request, res: Response) => {
    try {
        const animeData = await scrapeAnime()

        res.status(200).json(animeData)
    } catch (error) {
        let message
        if (error instanceof Error) {
            message = error.message
        }
        message = String(message)
        res.status(400).json({ message: message })
    }
}


export { getAll }
