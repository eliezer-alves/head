import { ExternalProviderLogin } from '@auth/data/usecases'
import { ExternalAuthProviderSpy } from '@/../tests/common/external-auth-provider'

import { describe, expect, it } from 'vitest'
import { AuthStatus } from '@/common/auth-provider'
import { UnexpectedError } from '@/common/errors'

type SutTypes = {
  sut: ExternalProviderLogin
  externalProviderSpy: ExternalAuthProviderSpy
}

const makeSut = (): SutTypes => {
  const externalProviderSpy = new ExternalAuthProviderSpy()
  const sut = new ExternalProviderLogin(externalProviderSpy)
  return {
    sut,
    externalProviderSpy,
  }
}

describe('Auth - External Provider Login', () => {
  it('Should instantiate the ExternalProviderLogin use case', () => {
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
})
