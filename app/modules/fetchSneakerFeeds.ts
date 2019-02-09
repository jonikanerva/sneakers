import axios from 'axios'
import * as R from 'ramda'
import { config } from '../../config/config'

let headerCache = {}

export const fetchSneakerFeeds = (): Promise<any> => {
  const lastEtag = R.propOr('', 'etag', headerCache)
  const lastDate = R.propOr(
    'Tue, 01 Jan 2019 00:00:00 GMT',
    'date',
    headerCache
  )

  return axios({
    url: `https://api.feedbin.com/v2/taggings.json`,
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

      headerCache = { etag, date }

      return response
    })
    .then(R.prop('data'))
    .then(<any>R.filter(R.propEq('name', 'Sneakers')))
    .then(R.map(R.prop('feed_id')))
}
