import axios from 'axios'
import * as R from 'ramda'
import { config } from '../../config/config'

const adidas = 4068
const nike = 5873

const getFeedBin = (id: number): Promise<any> =>
  axios({
    url: `https://api.feedbin.com/v2/saved_searches/${id}.json?include_entries=true`,
    auth: {
      username: config.feedbin.username,
      password: config.feedbin.password
    },
    timeout: 5000 // number of milliseconds before the request times out
  }).then(R.prop('data'))

export const getNike = () => getFeedBin(nike)
export const getAdidas = () => getFeedBin(adidas)
