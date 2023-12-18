import { beforeEach, describe, expect, it } from 'vitest'
import { CreateGymService } from './create-gym'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymService
describe('Create Gym Service', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymService(gymsRepository)
  })
  it('shoud be able to create gym', async () => {
    const { gym } = await sut.execute({
      title: 'Teste Gym',
      description: '',
      phone: '',
      latitude: 0,
      longitude: 0,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
