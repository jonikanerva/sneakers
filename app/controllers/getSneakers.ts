import * as R from 'ramda'
import { NextFunction, Request, Response } from 'express'
import { getFeedBin } from '../modules/feedbinApi'
import { parseFeed } from '../modules/parseFeeds'
import { createHtml } from '../modules/createHtml'
import { cache } from '../modules/cache'

const cacheOneHour = cache(3600)
const fetchAndRender = (brand: string) => () =>
  getFeedBin(brand)
    .then(parseFeed)
    .then(createHtml)

export const getSneakers = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const b = R.pathOr('', ['query', 'b'], req)
  const cacheKey = b === 'adidas' ? 'adidas' : 'nike'

  cacheOneHour
    .readOrElse(cacheKey, fetchAndRender(b))
    .then(html => res.send(html))
    .catch(next)
}
