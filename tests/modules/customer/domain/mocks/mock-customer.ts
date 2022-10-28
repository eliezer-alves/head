import { CustomerModel } from '@customer/domain/models'
import { faker } from '@faker-js/faker'

export const mockCustomerModel = (): CustomerModel => ({
  id: faker.datatype.uuid(),
  name: faker.name.fullName(),
})
