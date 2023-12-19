import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchNearbyGymsService } from './fetch-nearby-gyms'

let checkInsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsService

describe('Fetch gyms nearby Service', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsService(checkInsRepository)
  })

  it('shoud be able to fetch nearby gyms', async () => {
    await checkInsRepository.create({
      title: 'Near Gym',
      description: '',
      phone: '',
      latitude: -3.0355414,
      longitude: -59.9978605,
    })
    await checkInsRepository.create({
      title: 'Far Gym',
      description: '',
      phone: '',
      latitude: -3.1403219,
      longitude: -60.0222834,
    })

    const { gyms } = await sut.execute({
      userLatitude: -3.0355414,
      userLongitude: -59.9978605,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
