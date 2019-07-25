import { NextFunction, Request, Response } from 'express'
import { indexHtml } from '../views/indexHtml'

export const getSneakers = (
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const url = req.route.path || '/'
  const html = indexHtml(url)

  res.send(html)
}
