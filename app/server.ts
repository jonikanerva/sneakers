import * as express from 'express'
import { Application, Request, Response } from 'express'

const app: Application = express()
const port = process.env.PORT || '3000'

app.disable('x-powered-by')

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok' })
})

app.listen(port, () => console.log(`App running in on port ${port}!`))
