import { cacheSet, generateCacheKey } from '../modules/cache'
import { fetchAndParse } from '../modules/fetchFeed'
import { logger } from '../logger'

const fiveHours = 60 * 60 * 5

const fetchParseAndStore = (brand: string): Promise<any> =>
  fetchAndParse(brand)
    .then(data => ({ data, cacheKey: generateCacheKey(brand) }))
    .then(({ data, cacheKey }) => cacheSet(cacheKey, fiveHours, data))
    .then(() => logger.info({ message: `${brand} feed fetched and stored!` }))

Promise.all([fetchParseAndStore('nike'), fetchParseAndStore('adidas')])
  .then(() => {
    logger.info({ message: 'Worker finished!' })

    process.exit(0)
  })
  .catch(error => {
    logger.info({ message: 'Worker failed', error })

    process.exit(1)
  })
