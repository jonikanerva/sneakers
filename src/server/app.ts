import express from 'express'
import { getHealth } from './controllers/getHealth'
import { getSneakers } from './controllers/getSneakers'
import { defaultError } from './controllers/defaultError'

const app: express.Application = express()

app.disable('x-powered-by')

app.get('/', getSneakers)
app.get('/health', getHealth)

app.use(express.static('build/public'))
app.use(defaultError)

export { app }
