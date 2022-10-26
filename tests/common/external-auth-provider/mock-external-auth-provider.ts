import { AuthProvider, AuthResponse, AuthStatus } from '@/common/auth-provider'

export class ExternalAuthProviderSpy<T = any> implements AuthProvider<T> {
  response: AuthResponse = {
    status: AuthStatus.ok,
  }

  async auth(): Promise<AuthResponse> {
    return this.response
  }
}
