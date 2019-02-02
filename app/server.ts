import * as express from 'express'
import * as winston from 'winston'
import { Application, Request, Response } from 'express'
import { config } from '../config/config'

const app: Application = express()
export const logger = winston.createLogger({
  level: config.logLevel,
  transports: [new winston.transports.Console()]
})

app.disable('x-powered-by')

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok' })
})

app.listen(config.port, () =>
  logger.info(
    `App running in ${config.environment} -environment on port ${config.port}!`
  )
)
