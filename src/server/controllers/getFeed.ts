import { NextFunction, Request, Response } from 'express'
import { fetchFeedFor } from '../modules/fetchFeed'

const parseBrand = (brand: string): Promise<string> => {
  const allowed = ['adidas', 'nike', 'jordan']

  return allowed.includes(brand)
    ? Promise.resolve(brand)
    : Promise.reject('Invalid Brand')
}

export const getFeed = (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> =>
  parseBrand(req.params.brand)
    .then(brand => fetchFeedFor(brand))
    .then(feed => {
      res.json(feed)
    })
    .catch(error => {
      res.status(400).json({ error })
    })
