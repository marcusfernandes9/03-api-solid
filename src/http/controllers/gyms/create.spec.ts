import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user'

describe('Create Gym e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it('should be able to create a gym', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    const profileResponse = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'JS gym',
        description: 'Some description',
        phone: '48999887754',
        latitude: -3.0355414,
        longitude: -59.9978605,
      })

    expect(profileResponse.statusCode).toEqual(201)
  })
})
