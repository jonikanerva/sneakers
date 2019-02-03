import * as R from 'ramda'
import { FeedResponse } from '../modules/parseFeeds'

const drawItem = (item: FeedResponse): string => `
<div class='tile'>
  <a href="${item.url}">
    <img alt="${item.title}" alt="${item.title}" src="${item.image}"/>
  </a>
</div>
`

export const drawItems = (feed: FeedResponse[]): string =>
  R.compose(
    R.join(''),
    R.map(drawItem)
  )(feed)

export const createHtml = (feed: FeedResponse[]): string => `
<html>
<title>Sneakers</title>

<style>
.content {
  display: flex;
  flex-wrap: wrap;
  width: 100%
}
.tile {
  width: 350px;
  height: 250px;
  overflow: hidden;
  flex-grow: 1;
}
.tile img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  overflow: hidden;
}
</style>

<body>
  <div class='content'>
    ${drawItems(feed)}
  </div>
</body>
</html>
`
