import { RemoteAddCustomer } from '@customer/data/usecases'
import { faker } from '@faker-js/faker'

export const mockAddCustomerParams = (): RemoteAddCustomer.Params => {
  return {
    name: faker.name.fullName(),
  }
}
