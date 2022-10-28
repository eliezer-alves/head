import { RemoteAddCustomer } from '@customer/data/usecases'
import { mockCustomerModel } from './mock-customer'

export const mockAddCustomerParams = (): RemoteAddCustomer.Params => {
  const params = mockCustomerModel()
  delete params.id
  return params
}
