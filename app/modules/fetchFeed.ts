import { cache } from './cache'
import { getFeedBin } from './feedbinApi'
import { parseFeed } from './parseFeeds'

const cacheOneHour = cache(3600)
const fetchAndParse = (brand: string) => () =>
  getFeedBin(brand)
    .then(parseFeed)
    .then(JSON.stringify)

export const fetchFeed = (brand: string) => {
  const cacheKey = brand === 'adidas' ? 'adidas-v2' : 'nike-v2'

  return cacheOneHour
    .readOrElse(cacheKey, fetchAndParse(brand))
    .then(JSON.parse)
}
