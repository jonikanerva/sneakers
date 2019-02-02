import * as express from 'express'
import { config } from '../config/config'
import { getHealth } from './getHealth'
import { logger } from './logger'

const app: express.Application = express()

app.disable('x-powered-by')
app.get('/health', getHealth)

app.listen(config.port, () =>
  logger.info(
    `App running in ${config.environment} -environment on port ${config.port}!`
  )
)
