import { AuthProvider, AuthStatus } from '@/common/auth-provider'
import { UnexpectedError } from '@/common/errors'
import { UserModel } from '../../domain/models'

export class ExternalProviderLogin {
  constructor(private readonly authProvider: AuthProvider<UserModel>) {}

  async exec(): Promise<any> {
    const authResponse = await this.authProvider.auth()
    switch (authResponse.status) {
      case AuthStatus.ok:
        return authResponse.body
      case AuthStatus.badRequest:
        throw new UnexpectedError()
      default:
        throw new UnexpectedError()
    }
  }
}
