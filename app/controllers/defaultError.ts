import { NextFunction, Request, Response } from 'express'
import { logger } from '../logger'

export const defaultError = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const { name, message, stack } = err
  const { url, body } = req
  const status = 500

  logger.error({ status, name, message, url, body, stack })

  res.status(status).json({ status, name, message })
}
