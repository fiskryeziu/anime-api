import express from 'express'
import { getAll } from '../controllers/animeController'

const route = express.Router()


route.route('/all').get(getAll)


export default route


