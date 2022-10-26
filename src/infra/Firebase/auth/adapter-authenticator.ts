import { AuthProvider, AuthResponse, AuthStatus } from '@/common/auth-provider'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

export class AdapterAuthProvider<T = any> implements AuthProvider<T> {
  private provider
  constructor() {
    this.provider = new GoogleAuthProvider()
  }
  public response: AuthResponse<T> = {
    status: AuthStatus.ok,
  }

  async auth(): Promise<AuthResponse<T>> {
    const auth = getAuth()
    try {
      const result = await signInWithPopup(auth, this.provider)

      this.response.body = {
        name: result.user.displayName,
        email: result.user.email,
        id: result.user.uid,
      }
    } catch (error) {
      this.response.status = AuthStatus.badRequest
    }

    return this.response
  }
}
