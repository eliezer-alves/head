import { Mocked, vi } from 'vitest'
import * as authenticator from 'firebase/auth'

export enum AuthErrorCode {
  PERMISSION_DENIED = 'PERMISSION_DENIED',
  ANY = 'ANY',
}

export class AuthError extends Error {
  public code: string
  constructor(code = '', message = 'Auth Error') {
    super(message)
    this.name = 'AuthError'
    this.code = code
  }
}

export class MockAuth {
  private mockedAuthenticator = authenticator as Mocked<typeof authenticator>
  private isError = false
  private errorCode?: AuthErrorCode
  private errorMessage?: string = 'Mocked Auth Error'

  public mockSignInWithPopup(user: any) {
    if (this.isError) {
      this.mockedAuthenticator.signInWithPopup
        .mockClear()
        .mockImplementation(() => {
          throw new AuthError(this.errorCode, this.errorMessage)
        })
    } else {
      this.mockedAuthenticator.signInWithPopup.mockImplementation(
        vi.fn().mockImplementation(() =>
          Promise.resolve({
            user: {
              displayName: user.name,
              email: user.email,
              uid: user.id,
            },
          }),
        ),
      )
    }

    return this.mockedAuthenticator
  }

  public throwError(code: AuthErrorCode, message?: string): void {
    this.isError = true
    this.errorCode = code
    this.errorMessage = message
  }
}
