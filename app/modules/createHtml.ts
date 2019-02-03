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

export const createHtml = (brand: string) => (feed: FeedResponse[]): string => `
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Sneakers</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no viewport-fit=cover">
  <meta name="theme-color" content="#000000">

  <style>
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  }
  #navi {
    display: flex;
    flex-wrap: nowrap;
    width: 100%
  }
  .navibutton {
    width: 50%;
    text-align: center;
    font-size: 40px;
    padding: 20px;
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
  .tile img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    overflow: hidden;
  }
  </style>
</head>

<body>
  <div id='navi'>
    <div class='navibutton ${brand === 'adidas' ? '' : 'selected'}'>
      <a href="?b=nike">nike</a>
    </div>
    <div class='navibutton ${brand === 'adidas' ? 'selected' : ''}'>
      <a href="?b=adidas">adidas</a>
    </div>
  </div>

  <div id='content'>
    ${drawItems(feed)}
  </div>
</body>
</html>
`
