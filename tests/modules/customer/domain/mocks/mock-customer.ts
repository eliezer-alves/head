import { CustomerModel } from '@customer/domain/models'
import { faker } from '@faker-js/faker'

export const mockCustomerModel = (): CustomerModel => ({
  id: faker.datatype.uuid(),
  name: faker.name.fullName(),
  email: faker.internet.email(),
  address: {
    city: faker.address.city(),
    state: faker.address.state(),
    country: faker.address.country(),
    line1: faker.address.street(),
    postal_code: faker.address.zipCode(),
  },
})
