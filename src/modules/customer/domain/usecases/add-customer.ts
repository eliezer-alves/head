import { CustomerModel } from '../models'

export interface AddCustomer {
  exec: () => Promise<void>
}

export namespace AddCustomer {
  export type Params = {
    name: string
  }

  export type Model = CustomerModel
}
