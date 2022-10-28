import { CustomerModel } from '../models'

export interface AddCustomer {
  exec: (params: AddCustomer.Params) => Promise<AddCustomer.Model>
}

export namespace AddCustomer {
  export type Params = Omit<CustomerModel, 'id'>

  export type Model = CustomerModel
}
