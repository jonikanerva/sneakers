import * as R from 'ramda'
import { NextFunction, Request, Response } from 'express'
import { getAdidas, getNike } from '../modules/feedbinApi'
import { parseFeed } from '../modules/parseFeeds'
import { createHtml } from '../modules/createHtml'

export const getSneakers = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const brand = R.path(['query', 'b'], req)

  brand === 'adidas'
    ? getAdidas()
    : getNike()
        .then(parseFeed)
        .then(createHtml)
        .then(html => res.send(html))
        .catch(next)
}
