import * as R from 'ramda'

const environment = R.isNil(process.env.DYNO) ? 'local' : 'heroku'

interface Config {
  environment: string
  port: number
  logLevel: string
}

const environments = {
  local: {
    environment,
    logLevel: 'silly',
    port: 3000
  },
  heroku: {
    environment,
    logLevel: 'info',
    port: parseInt(process.env.PORT || '', 10)
  }
}

export const config: Config = R.prop(environment, environments)
