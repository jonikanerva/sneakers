import * as R from 'ramda'
import { NextFunction, Request, Response } from 'express'
import { createHtml } from '../modules/createHtml'
import { fetchFeed } from '../modules/fetchFeed'

export const getSneakers = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const brand = R.pathOr('', ['query', 'b'], req)

  fetchFeed(brand)
    .then(createHtml(brand))
    .then(html => res.send(html))
    .catch(next)
}
