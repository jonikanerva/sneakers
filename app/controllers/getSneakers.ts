import * as R from 'ramda'
import { NextFunction, Request, Response } from 'express'
import { renderFeed } from '../modules/renderFeed'

export const getSneakers = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const brand = R.pathOr('', ['query', 'b'], req)

  renderFeed(brand)
    .then(html => res.send(html))
    .catch(next)
}
