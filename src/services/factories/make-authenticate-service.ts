import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticateService } from '../authenticate'

export function makeAuthenticateService() {
  const usersRepository = new PrismaUsersRepository()
  const athenticateService = new AuthenticateService(usersRepository)

  return athenticateService
}
