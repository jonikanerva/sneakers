import R from 'ramda'
import { FeedResponse } from '../modules/parseFeed'
import { mainHtml } from './mainHtml'
import { DateTime } from 'luxon'

let lastDay = ''

const drawDate = (date: DateTime): string => `
<div class='date'>
  ${date.toLocaleString(DateTime.DATE_MED)}
</div>
`

const drawTile = (item: FeedResponse): string => `
<div class='tile'>
  <a href="${item.url}">
    <img title="${item.title}" alt="${item.title}" src="${item.image}"/>
  </a>
</div>
`

const drawItem = (item: FeedResponse): string => {
  const date = DateTime.fromISO(item.published)
  const day = date.toFormat('dd')
  const html =
    lastDay !== day ? drawDate(date) + drawTile(item) : drawTile(item)

  lastDay = day

  return html
}

export const drawItems = (feed: FeedResponse[]): string =>
  R.compose(
    R.join(''),
    R.map(drawItem)
  )(feed)

const styles = `
#navi {
  display: flex;
  flex-wrap: nowrap;
  width: 100%
}
.navibutton {
  width: 50%;
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  padding: 20px 0 0 0;
}
.navibutton a {
  text-decoration: none;
  color: black;
}
.selected {
  text-decoration: underline;
}

#content {
  display: flex;
  flex-wrap: wrap;
  width: 100%
}
.tile {
  width: 350px;
  height: 300px;
  overflow: hidden;
  flex-grow: 1;
}
.date {
  break-before: always;
  width: 100%;
  flex-grow: 1;
  font-size: 25px;
  font-weight: 200;
  padding: 25px 0px 10px 5px;
}
.tile img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  overflow: hidden;
}
`

const renderContent = (brand: string, feed: FeedResponse[]): string => `
  <div id='navi'>
    <div class='navibutton ${brand === 'nike' ? 'selected' : ''}'>
      <a href="?b=nike">nike</a>
    </div>
    <div class='navibutton ${brand === 'jordan' ? 'selected' : ''}'>
      <a href="?b=jordan">jordan</a>
    </div>
    <div class='navibutton ${brand === 'adidas' ? 'selected' : ''}'>
      <a href="?b=adidas">adidas</a>
    </div>
  </div>

  <div id='content'>
    ${drawItems(feed)}
  </div>
`

export const feedHtml = (brand: string) => (feed: FeedResponse[]): string => {
  const content = renderContent(brand, feed)

  return mainHtml(styles, content)
}
