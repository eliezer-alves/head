import { UserModel } from '../models'

export interface LoginWithExternalProvider {
  exec: () => Promise<LoginWithExternalProvider.Model>
}

export namespace LoginWithExternalProvider {
  export type Model = UserModel
}
