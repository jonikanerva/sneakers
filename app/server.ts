import { app } from './app'
import { config } from '../config/config'
import { logger } from './logger'

app.listen(config.port, () =>
  logger.info(
    `App running in ${config.environment} -environment on port ${config.port}!`
  )
)
