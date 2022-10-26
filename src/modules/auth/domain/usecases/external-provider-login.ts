import { UserModel } from '../models'

export interface ExternalProviderLogin {
  make: () => Promise<ExternalProviderLogin.Model>
}

export namespace ExternalProviderLogin {
  export type Model = UserModel
}
