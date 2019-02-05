import { cache, generateCacheKey } from './cache'
import { getFeedBin } from './feedbinApi'
import { parseFeed } from './parseFeeds'

const fiveHours = 60 * 60 * 5
const cachefiveHours = cache(fiveHours)

export const fetchAndParse = (brand: string) =>
  getFeedBin(brand)
    .then(parseFeed)
    .then(JSON.stringify)

export const fetchFeed = (brand: string) => {
  const cacheKey = generateCacheKey(brand)

  return cachefiveHours
    .readOrElse(cacheKey, () => fetchAndParse(brand))
    .then(JSON.parse)
}
