import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gyms-repository'

interface SearchGymsServiceRequest {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}
interface SearchGymsServiceResponse {
  gym: Gym
}
export class SearchGymsService {
  constructor(private gymRepository: GymsRepository) {}
  async execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: SearchGymsServiceRequest): Promise<SearchGymsServiceResponse> {
    const gym = await this.gymRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude,
    })
    return { gym }
  }
}
