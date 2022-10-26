import { AuthProvider, AuthStatus } from '@/common/auth-provider'
import { AdapterAuthProvider } from '@/infra/Firebase'
import { UserModel } from '@auth/domain/models'
import { AuthErrorCode, MockAuth } from '../mocks'
import { mockUserModel } from '@/../tests/modules/auth/domain/mocks/mock-user'
import { describe, expect, it, vi } from 'vitest'

vi.mock('firebase/auth')

type SutTypes = {
  sut: AuthProvider
  mockAuth: MockAuth
}

const makeSut = (): SutTypes => {
  const sut = new AdapterAuthProvider<UserModel>()
  const mockAuth = new MockAuth()

  return {
    sut,
    mockAuth,
  }
}

describe('Firebase - Provider Authenticator', () => {
  it('Should return status 400 when an error occurs', async () => {
    const { sut, mockAuth } = makeSut()
    mockAuth.throwError(AuthErrorCode.ANY)
    const response = await sut.auth()

    expect(response.status).toBe(AuthStatus.badRequest)
  })

  it('Should return the expected response when status is 200', async () => {
    const { sut, mockAuth } = makeSut()
    const expectedResponseBody = mockUserModel()
    mockAuth.mockSignInWithPopup(expectedResponseBody)
    const response = await sut.auth()

    expect(response.status).toBe(AuthStatus.ok)
    expect(response.body).toEqual(expectedResponseBody)
  })
})
