import R from 'ramda'
import { cache, cacheKey } from './cache'
import { fetchMultipleFeedEntries } from './fetchFeedEntries'
import { fetchSneakerFeeds } from './fetchSneakerFeeds'
import { parseFeed } from './parseFeed'

const fiveHours = 60 * 60 * 5
const cachefiveHours = cache(fiveHours)
const sortDesc = R.sort(R.descend(<any>R.prop('published')))

export const fetchAndParse = (): Promise<string> =>
  fetchSneakerFeeds()
    .then(fetchMultipleFeedEntries)
    .then(parseFeed)
    .then(sortDesc)
    .then(JSON.stringify)

export const fetchFeed = (): Promise<any> => {
  return cachefiveHours
    .readOrElse(cacheKey, () => fetchAndParse())
    .then(JSON.parse)
}

const query = (brand: string) => (obj: any) => {
  const queryStrign = brand === 'newbalance' ? 'new balance' : brand

  return R.includes(queryStrign, R.toLower(obj.content))
}

export const fetchFeedFor = (brand: string): Promise<any> =>
  fetchFeed()
    .then(R.filter(query(brand)))
    .then((feed: any) => R.take(75, feed))
