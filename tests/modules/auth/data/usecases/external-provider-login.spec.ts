import { describe, expect, it } from 'vitest'
import { ExternalProviderLogin } from '@auth/data/usecases'

describe('Auth - External Provider Login', () => {
  it('Should instantiate the ExternalProviderLogin use case', () => {
    const sut = new ExternalProviderLogin()
    expect(sut).not.toBeNull()
  })
})
