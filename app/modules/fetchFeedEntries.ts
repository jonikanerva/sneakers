import axios from 'axios'
import * as R from 'ramda'
import { config } from '../../config/config'

let headerCache = {}

export const fetchMultipleFeedEntries = (ids: number[]): Promise<any> =>
  Promise.all(R.map(id => fetchFeedEntries(id), ids)).then(R.flatten)

export const fetchFeedEntries = (id: number): Promise<any> => {
  const lastEtag = R.pathOr('', [id, 'etag'], headerCache)
  const lastDate = R.pathOr(
    'Tue, 01 Jan 2019 00:00:00 GMT',
    [id, 'date'],
    headerCache
  )

  return axios({
    url: `https://api.feedbin.com/v2/feeds/${id}/entries.json`,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'If-Modified-Since': lastEtag,
      'If-None-Match': lastDate
    },
    auth: {
      username: config.feedbin.username,
      password: config.feedbin.password
    },
    timeout: 20000 // number of milliseconds before the request times out
  })
    .then(response => {
      const { etag, date } = response.headers

      headerCache = R.assoc(<any>id, { etag, date }, headerCache)

      return response
    })
    .then(R.prop('data'))
}
