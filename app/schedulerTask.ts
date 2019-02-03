import { fetchFeed } from './modules/fetchFeed'

Promise.all([fetchFeed('nike'), fetchFeed('adidas')])
  .then(() => {
    console.log('Feeds fetched!')

    process.exit(0)
  })
  .catch(() => {
    console.log('Fetch failed!')

    process.exit(1)
  })
