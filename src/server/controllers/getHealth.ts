import { NextFunction, Request, Response } from 'express'

export const getHealth = (
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  res.json({ status: 'ok' })
}
