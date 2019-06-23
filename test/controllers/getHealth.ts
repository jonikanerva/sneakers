import 'jest'
import supertest from 'supertest'
import { app } from '../../src/server/app'

describe('health endpoint', () => {
  it('returns 200', () =>
    supertest(app)
      .get('/health')
      .then(response => {
        expect(response.status).toBe(200)
        expect(response.body).toEqual({ status: 'ok' })
      }))
})
