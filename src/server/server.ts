import { app } from './app'
import { config } from './config/config'
import { logger } from './logger'
import { networkInterfaces } from 'os'
import R from 'ramda'

const devIp = R.compose(
  R.path([0, 'address']),
  R.filter(R.propEq('internal', false)),
  R.filter(R.propEq('family', 'IPv4')),
  <any>R.flatten,
  R.values
)(networkInterfaces())

app.listen(config.port, () => {
  logger.info(
    `App running in ${config.environment} -environment on ${devIp}:${config.port}!`
  )
})
