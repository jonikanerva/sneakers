import axios from 'axios'
import * as R from 'ramda'
import { config } from '../../config/config'

const adidas = 4068
const nike = 5873
let headerCache = {}

export const getFeedBin = (brand: string): Promise<any> => {
  const id = brand === 'adidas' ? adidas : nike
  const lastEtag = R.pathOr('', [id, 'etag'], headerCache)
  const lastDate = R.pathOr(
    'Tue, 01 Jan 2019 00:00:00 GMT',
    [id, 'date'],
    headerCache
  )

  return axios({
    url: `https://api.feedbin.com/v2/saved_searches/${id}.json?include_entries=true`,
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
