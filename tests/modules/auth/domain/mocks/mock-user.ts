import { UserModel } from '@auth/domain/models'
import { faker } from '@faker-js/faker'

export const mockUserModel = (): UserModel => ({
  id: faker.datatype.uuid(),
  email: faker.internet.email(),
  name: faker.name.fullName(),
})
