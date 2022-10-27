import { RemoteLogin } from '@auth/data/usecases'
import { ExternalAuthProviderSpy } from '@/../tests/common/external-auth-provider'

import { describe, expect, it } from 'vitest'
import { AuthStatus } from '@/common/auth-provider'
import { UnexpectedError } from '@/common/errors'
import { mockUserModel } from '../../domain/mocks/mock-user'

type SutTypes = {
  sut: RemoteLogin
  externalProviderSpy: ExternalAuthProviderSpy
}

const makeSut = (): SutTypes => {
  const externalProviderSpy = new ExternalAuthProviderSpy()
  const sut = new RemoteLogin(externalProviderSpy)
  return {
    sut,
    externalProviderSpy,
  }
}

describe('Auth - External Provider Login', () => {
  it('Should instantiate the RemoteLogin use case', () => {
    const { sut } = makeSut()
    expect(sut).not.toBeNull()
  })

  it('Should throw UnexpectedError if AuthProvider returns 400', async () => {
    const { sut, externalProviderSpy } = makeSut()
    externalProviderSpy.response = {
      status: AuthStatus.badRequest,
    }

    const promise = sut.exec()

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('Should return an UserModel if AuthProvider returns 200', async () => {
    const { sut, externalProviderSpy } = makeSut()
    const authResult = mockUserModel()
    externalProviderSpy.response = {
      status: AuthStatus.ok,
      body: authResult,
    }

    const promise = await sut.exec()

    expect(promise).toEqual(authResult)
  })
})
