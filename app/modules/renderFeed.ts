import { parseFeed } from './parseFeeds'
import { createHtml } from './createHtml'
import { cache } from './cache'
import { getFeedBin } from './feedbinApi'

const cacheOneHour = cache(3600)

const fetchAndRender = (brand: string) => () =>
  getFeedBin(brand)
    .then(parseFeed)
    .then(createHtml)

export const renderFeed = (brand: string) => {
  const cacheKey = brand === 'adidas' ? 'adidas' : 'nike'

  return cacheOneHour.readOrElse(cacheKey, fetchAndRender(brand))
}
