import { Request, Response, NextFunction } from "express"
import NodeCache from "node-cache"
const cache = new NodeCache({ stdTTL: 1800, checkperiod: 300 })

export const cacheMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const key = req.originalUrl || req.url
  const cachedData = cache.get(key)

  if (cachedData) {
    return res.status(200).json(cachedData)
  } else {
    const json = res.json

    res.json = function (body) {
      cache.set(key, body)
      return json.call(this, body)
    }

    next()
  }
}
