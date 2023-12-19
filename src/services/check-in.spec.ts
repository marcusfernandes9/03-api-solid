import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CheckInService } from './check-in'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error'
import { MaxDistanceError } from './errors/max-distance-error'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInService

describe('Check-in Service', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInService(checkInsRepository, gymsRepository)
    await gymsRepository.create({
      id: 'gym-01',
      title: 'Academia Teste',
      description: '',
      phone: '',
      latitude: -3.0355414,
      longitude: -59.9978605,
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('shoud be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -3.0355414,
      userLongiture: -59.9978605,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('shoud not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2023, 0, 10, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -3.0355414,
      userLongiture: -59.9978605,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -3.0355414,
        userLongiture: -59.9978605,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('shoud be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2023, 0, 10, 8, 0, 0))
    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -3.0355414,
      userLongiture: -59.9978605,
    })
    vi.setSystemTime(new Date(2023, 0, 11, 8, 0, 0))
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -3.0355414,
      userLongiture: -59.9978605,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('shoud not be able to check in on distant gym', async () => {
    gymsRepository.items.push({
      id: 'gym-02',
      title: 'Academia Teste 2',
      description: '',
      phone: '',
      latitude: new Decimal(-3.0332311),
      longitude: new Decimal(-59.9926369),
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-02',
        userId: 'user-01',
        userLatitude: -3.0355414,
        userLongiture: -59.9978605,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
