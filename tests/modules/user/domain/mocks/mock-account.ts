import { AccountModel } from '@user/domain/models'
import { faker } from '@faker-js/faker'

export const mockAccountModel = (): AccountModel => ({
  id: faker.datatype.uuid(),
  accessToken: faker.datatype.uuid(),
  name: faker.name.fullName(),
})
