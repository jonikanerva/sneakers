import { NextFunction, Request, Response } from 'express'
import { getNike } from '../modules/feedbinApi'
import { parseFeed } from '../modules/parseFeeds'
import { createHtml } from '../modules/createHtml'

export const getSneakers = (
  _req: Request,
  res: Response,
  next: NextFunction
): void => {
  getNike()
    .then(parseFeed)
    .then(createHtml)
    .then(html => res.send(html))
    .catch(next)
}
