import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

interface RegisterServiceRequest {
  name: string
  email: string
  password: string
}
export class RegisterService {
  constructor(private userRepository: UsersRepository) {}
  async execute({ name, email, password }: RegisterServiceRequest) {
    const userWithSameEmail = await this.userRepository.findByEmail(email)
    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }
    const password_hash = await hash(password, 6)

    await this.userRepository.create({
      name,
      email,
      password_hash,
    })
  }
}
