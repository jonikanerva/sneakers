import { NextFunction, Request, Response } from 'express'
import { indexHtml } from '../views/indexHtml'

export const getSneakers = (
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  res.send(indexHtml)
}
