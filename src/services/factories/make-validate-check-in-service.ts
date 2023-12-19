import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { ValidateCheckInService } from '../validate-check-in'

export function makeValidateCheckInService() {
  const gymsRepository = new PrismaCheckInsRepository()
  const service = new ValidateCheckInService(gymsRepository)

  return service
}
