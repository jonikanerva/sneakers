import express from 'express'
import { getHealth } from './controllers/getHealth'
import { getSneakers } from './controllers/getSneakers'
import { defaultError } from './controllers/defaultError'
import { getFeed } from './controllers/getFeed'

const app: express.Application = express()

app.disable('x-powered-by')

app.get('/', getSneakers)
app.get('/feed/:brand', getFeed)
app.get('/health', getHealth)
app.get('/:brand', getSneakers)

app.use(express.static('build/public'))
app.use(defaultError)

export { app }
