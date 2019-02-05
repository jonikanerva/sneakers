import * as R from 'ramda'
import { NextFunction, Request, Response } from 'express'
import { feedHtml } from '../views/feedHtml'
import { fetchFeed } from '../modules/fetchFeed'

export const getSneakers = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const brand = R.pathOr('', ['query', 'b'], req)

  fetchFeed(brand)
    .then(feedHtml(brand))
    .then(html => res.send(html))
    .catch(next)
}
