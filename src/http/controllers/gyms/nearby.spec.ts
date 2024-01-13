import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user'

describe('Search Gyms e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it('should be able to list nearby gyms', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Near gym',
        description: 'Some description',
        phone: '48999887754',
        latitude: -3.0355414,
        longitude: -59.9978605,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Far gym',
        description: 'Some description',
        phone: '48999887754',
        latitude: -3.1403219,
        longitude: -60.0222834,
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: -3.0355414,
        longitude: -59.9978605,
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'Near gym',
      }),
    ])
  })
})
