import * as R from 'ramda'
import * as dotenv from 'dotenv'

const environment = R.isNil(process.env.DYNO) ? 'local' : 'heroku'

if (environment === 'local') {
  dotenv.config()
}

interface Config {
  environment: string
  port: string
  logLevel: string
  feedbin: {
    username: string
    password: string
  }
}

export const config: Config = {
  environment,
  feedbin: {
    username: process.env.FEEDBIN_USER || '',
    password: process.env.FEEDBIN_PASS || ''
  },
  logLevel: environment === 'local' ? 'silly' : 'info',
  port: process.env.PORT || '3000'
}
