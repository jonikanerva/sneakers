/* tslint:disable:no-var-requires */
import 'jest'
import { fetchSneakerFeeds } from '../../app/modules/fetchSneakerFeeds'
import { fetchAndParse } from '../../app/modules/fetchFeed'

describe('feedbin api', () => {
  it('fetches sneaker feeds', done => {
    fetchSneakerFeeds().then(response => {
      expect(Array.isArray(response)).toBe(true)

      expect(response[0]).toEqual(1370385)

      done()
    })
  })

  it('fetchs all sneaker entries and parses them', done => {
    fetchAndParse().then(response => {
      expect(response).toBeDefined()

      done()
    })
  })
})
