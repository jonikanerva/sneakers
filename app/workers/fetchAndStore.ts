import { parseFeed } from '../modules/parseFeeds'
import { getFeedBin } from '../modules/feedbinApi'
import { cacheSet, generateCacheKey } from '../modules/cache'
import { logger } from '../logger'

const fiveHours = 60 * 60 * 5

const fetchAndParse = (brand: string) =>
  getFeedBin(brand)
    .then(parseFeed)
    .then(JSON.stringify)
    .then(data => {
      const cacheKey = generateCacheKey(brand)

      cacheSet(cacheKey, fiveHours, data)
      logger.info({ message: `${brand} feed fetched and stored!` })
    })

Promise.all([fetchAndParse('nike'), fetchAndParse('adidas')])
  .then(() => {
    logger.info({ message: 'Worker finished!' })

    process.exit(0)
  })
  .catch(error => {
    logger.info({ message: 'Worker failed', error })

    process.exit(1)
  })
