import * as R from 'ramda'
import { JSDOM } from 'jsdom'

export interface FeedResponse {
  id: string
  title: string
  published: string
  url: string
  image: string
}

export const imageFromHtml = (html: string): string | undefined => {
  const dom = new JSDOM(html)
  const firstImage = dom.window.document.querySelector('img')

  return firstImage ? firstImage.src : undefined
}

const pickFields = (item: any): any => {
  const fields = R.pickAll(['id', 'published', 'url', 'title'], item)
  const html = R.prop('content', item)

  return {
    ...fields,
    image: imageFromHtml(html)
  }
}

const hasNoImage = R.propEq('image', undefined)
const sortDesc = R.sort(R.descend(<any>R.prop('published')))

export const parseFeed = (data: object[]): FeedResponse[] => <any>R.compose(
    sortDesc,
    R.reject(hasNoImage),
    R.map(pickFields)
  )(data)
