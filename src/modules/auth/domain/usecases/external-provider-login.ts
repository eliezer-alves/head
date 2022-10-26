import { UserModel } from '../models'

export interface ExternalProviderLogin {
  exec: () => Promise<ExternalProviderLogin.Model>
}

export namespace ExternalProviderLogin {
  export type Model = UserModel
}
