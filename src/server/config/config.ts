import R from 'ramda'
import dotenv from 'dotenv'

const environment = R.isNil(process.env.DYNO) ? 'local' : 'heroku'

if (environment === 'local') {
  dotenv.config()
}

interface Config {
  environment: string
  port: string
  logLevel: string
  redisUrl: string
  feedbin: {
    username: string
    password: string
  }
}

export const config: Config = {
  environment,
  feedbin: {
    username: process.env.FEEDBIN_USER || '',
    password: process.env.FEEDBIN_PASS || '',
  },
  logLevel: environment === 'local' ? 'silly' : 'info',
  port: process.env.PORT || '3000',
  redisUrl: process.env.REDIS_URL || '',
}
