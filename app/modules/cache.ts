import * as redis from 'redis'
import * as R from 'ramda'
import { config } from '../../config/config'
import { logger } from '../logger'

const md5Hex = require('md5-hex') // tslint:disable-line:no-var-requires
const client = redis.createClient({ url: config.redisUrl })

logger.info(`Redis running on ${config.redisUrl}`)

const cacheGet = (key: string): Promise<any> =>
  new Promise((resolve, reject) =>
    client.get(key, (getError: any, data: any) =>
      getError ? reject(getError) : resolve(data)
    )
  )

const cacheSet = (key: string, period: number, data: string): Promise<any> =>
  new Promise((resolve, reject) =>
    client.set(key, data, 'EX', period, (setError: any) =>
      setError ? reject(setError) : resolve(data)
    )
  )

const getOrSet = (key: string, period: number, fnc: any): Promise<any> =>
  cacheGet(key).then(data =>
    !R.isEmpty(data) && !R.isNil(data)
      ? data
      : fnc().then((response: any) => cacheSet(key, period, response))
  )

export const cache = (cachePeriodSeconds: number) => ({
  readOrElse: (key: string, fnc: any): Promise<any> =>
    getOrSet(key, cachePeriodSeconds, fnc)
})

export const generateCacheKey = (key: string): string => md5Hex(key)
