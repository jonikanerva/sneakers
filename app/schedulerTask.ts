import { renderFeed } from './modules/renderFeed'

Promise.all([renderFeed('nike'), renderFeed('adidas')])
  .then(() => {
    console.log('Feeds fetched!')

    process.exit(0)
  })
  .catch(() => {
    console.log('Fetch failed!')

    process.exit(1)
  })
