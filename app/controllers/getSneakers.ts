import * as R from 'ramda'
import { NextFunction, Request, Response } from 'express'
import { getFeedBin } from '../modules/feedbinApi'
import { parseFeed } from '../modules/parseFeeds'
import { createHtml } from '../modules/createHtml'

export const getSneakers = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const brand = R.pathOr('', ['query', 'b'], req)

  getFeedBin(brand)
    .then(parseFeed)
    .then(createHtml)
    .then(html => res.send(html))
    .catch(next)
}
