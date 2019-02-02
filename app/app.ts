import * as express from 'express'
import { getHealth } from './getHealth'

const app: express.Application = express()

app.disable('x-powered-by')
app.get('/health', getHealth)

export { app }
