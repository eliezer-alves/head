import { describe, expect, it } from 'vitest'
import { ExternalProviderLogin } from '@auth/data/usecases'

describe('Auth - External Provider Login', () => {
  it('Deve instanciar o caso de uso Login', () => {
    const sut = new ExternalProviderLogin()
    expect(sut).not.toBeNull()
  })
})
