import axios from 'axios'
import * as R from 'ramda'
import { config } from '../../config/config'

const axiosConfig = {
  url:
    'https://api.feedbin.com/v2/saved_searches/5873.json?include_entries=true',
  auth: {
    username: config.feedbin.username,
    password: config.feedbin.password
  }
}

export const getNike = (): Promise<any> =>
  axios(axiosConfig).then(R.prop('data'))
