/* tslint:disable:no-var-requires */
import 'jest'
import R from 'ramda'
import { parseFeed, imageFromHtml } from '../../src/server/modules/parseFeed'

const feedbinResponse = require('../fixtures/feedbinResponse.json')

describe('feedbin response parser', () => {
  it('parses it good', () => {
    const response = parseFeed(feedbinResponse)

    expect(Array.isArray(response)).toBe(true)
    expect(response[0]).toHaveProperty('id')
    expect(response[0]).toHaveProperty('published')
    expect(response[0]).toHaveProperty('url')
    expect(response[0]).toHaveProperty('image')
  })

  it('extracts images from html', () => {
    const html = R.pathOr('', [0, 'content'], feedbinResponse)
    const response = imageFromHtml(html)

    expect(response).toEqual(
      'https://www.sneakerfiles.com/wp-content/uploads/2018/12/nike-fear-of-god-air-skylon-2-light-bone-BQ2752-003-release-date-price.jpg'
    )
  })
})
