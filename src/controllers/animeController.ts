import { Request, Response } from "express"
import { scrapeAnime } from "../services/animeScraper"
import { animeCategory, } from "../services/animeCategory"
import { animeByGenre } from "../services/animeByGenre"
import { animeInfo } from "../services/animeInfo"

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

const getTopAiring = async (req: Request, res: Response) => {
    try {
        const page = req.query.page ?? 1
        const animeData = await animeCategory(+page, 'top-airing')

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

const getMostPopular = async (req: Request, res: Response) => {
    try {
        const page = req.query.page ?? 1
        const animeData = await animeCategory(+page, 'most-popular')

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

const getMostFavorite = async (req: Request, res: Response) => {
    try {
        const page = req.query.page ?? 1
        const animeData = await animeCategory(+page, 'most-favorite')

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

const getLatestComplete = async (req: Request, res: Response) => {
    try {
        const page = req.query.page ?? 1
        const animeData = await animeCategory(+page, 'completed')

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
const getSubbedAnime = async (req: Request, res: Response) => {
    try {
        const page = req.query.page ?? 1
        const animeData = await animeCategory(+page, 'subbed-anime')

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
const getDubbedAnime = async (req: Request, res: Response) => {
    try {
        const page = req.query.page ?? 1
        const animeData = await animeCategory(+page, 'dubbed-anime')

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
const getMoviesAnime = async (req: Request, res: Response) => {
    try {
        const page = req.query.page ?? 1
        const animeData = await animeCategory(+page, 'movie')

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
const getTvAnime = async (req: Request, res: Response) => {
    try {
        const page = req.query.page ?? 1
        const animeData = await animeCategory(+page, 'tv')

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

const getOvaAnime = async (req: Request, res: Response) => {
    try {
        const page = req.query.page ?? 1
        const animeData = await animeCategory(+page, 'ova')

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

const getSpecialAnime = async (req: Request, res: Response) => {
    try {
        const page = req.query.page ?? 1
        const animeData = await animeCategory(+page, 'special')

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

const getByGenreAnime = async (req: Request, res: Response) => {
    try {
        const page = req.query.page ?? 1
        const genre = req.params.genre
        const animeData = await animeByGenre(+page, genre)

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
const getAnimeDetails = async (req: Request, res: Response) => {
    try {
        const details = req.params.details
        const animeData = await animeInfo(details)

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




export {
    getAll,
    getTopAiring,
    getMostPopular,
    getMostFavorite,
    getLatestComplete,
    getTvAnime,
    getDubbedAnime,
    getSubbedAnime,
    getOvaAnime,
    getMoviesAnime,
    getByGenreAnime,
    getSpecialAnime,
    getAnimeDetails
}
