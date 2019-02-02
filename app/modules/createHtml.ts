import * as R from 'ramda'
import { FeedResponse } from '../modules/parseFeeds'

export const createHtml = (feed: FeedResponse[]): string =>
  R.compose(
    R.join(''),
    R.map((item: FeedResponse) => `<img src="${item.image}"/>`)
  )(feed)
