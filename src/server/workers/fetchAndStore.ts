import { cacheSet, cacheKey } from '../modules/cache'
import { fetchAndParse } from '../modules/fetchFeed'
import { logger } from '../logger'

const fiveHours = 60 * 60 * 5

fetchAndParse()
  .then((data) => cacheSet(cacheKey, fiveHours, data))
  .then(() => {
    logger.info({ message: 'Worker finished!' })

    process.exit(0)
  })
  .catch((error) => {
    logger.info({ message: 'Worker failed', error })

    process.exit(1)
  })
