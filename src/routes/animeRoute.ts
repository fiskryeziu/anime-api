import express from 'express'
import {
    getAll,
    getByGenreAnime,
    getDubbedAnime,
    getLatestComplete,
    getMostFavorite,
    getMostPopular,
    getMoviesAnime,
    getOvaAnime,
    getSpecialAnime,
    getSubbedAnime,
    getTopAiring,
    getTvAnime
} from '../controllers/animeController'

const route = express.Router()

route.route('/all').get(getAll)
route.route('/top-airing').get(getTopAiring)
route.route('/most-popular').get(getMostPopular)
route.route('/most-favorite').get(getMostFavorite)
route.route('/completed').get(getLatestComplete)
route.route('/subbed-anime').get(getSubbedAnime)
route.route('/dubbed-anime').get(getDubbedAnime)
route.route('/tv').get(getTvAnime)
route.route('/movies').get(getMoviesAnime)
route.route('/special').get(getSpecialAnime)
route.route('/ova').get(getOvaAnime)
route.route('/genre/:genre').get(getByGenreAnime)

export default route


