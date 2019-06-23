import { NextFunction, Request, Response } from 'express'
import { feedHtml } from '../views/feedHtml'
import { fetchFeedFor } from '../modules/fetchFeed'

const parseBrand = (brand: any) => {
  switch (brand) {
    case 'adidas':
      return 'adidas'
    case 'jordan':
      return 'jordan'
    default:
      return 'nike'
  }
}

export const getSneakers = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const brand = parseBrand(req.query.b)

  fetchFeedFor(brand)
    .then(feedHtml(brand))
    .then(html => res.send(html))
    .catch(next)
}
