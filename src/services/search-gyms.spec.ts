import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { SearchGymsService } from './search-gyms'

let checkInsRepository: InMemoryGymsRepository
let sut: SearchGymsService

describe('Search Gyms Service', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsService(checkInsRepository)
  })

  it('shoud be able to search gyms', async () => {
    await checkInsRepository.create({
      title: 'Teste 1',
      description: '',
      phone: '',
      latitude: 0,
      longitude: 0,
    })
    await checkInsRepository.create({
      title: 'Teste 2',
      description: '',
      phone: '',
      latitude: 0,
      longitude: 0,
    })

    const { gyms } = await sut.execute({
      query: 'Teste',
      page: 1,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Teste 1' }),
      expect.objectContaining({ title: 'Teste 2' }),
    ])
  })

  it('shoud be able to fetch paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInsRepository.create({
        title: `Gym-${i}`,
        description: '',
        phone: '',
        latitude: 0,
        longitude: 0,
      })
    }

    const { gyms } = await sut.execute({
      query: 'Gym',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Gym-21' }),
      expect.objectContaining({ title: 'Gym-22' }),
    ])
  })
})
