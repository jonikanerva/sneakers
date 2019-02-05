import { cacheSet, generateCacheKey } from '../modules/cache'
import { fetchAndParse } from '../modules/fetchFeed'
import { logger } from '../logger'

const fiveHours = 60 * 60 * 5

const fetchParseAndStore = (brand: string) =>
  fetchAndParse(brand).then(data => {
    const cacheKey = generateCacheKey(brand)

    cacheSet(cacheKey, fiveHours, data)
    logger.info({ message: `${brand} feed fetched and stored!` })
  })

Promise.all([fetchParseAndStore('nike'), fetchParseAndStore('adidas')])
  .then(() => {
    logger.info({ message: 'Worker finished!' })

    process.exit(0)
  })
  .catch(error => {
    logger.info({ message: 'Worker failed', error })

    process.exit(1)
  })
