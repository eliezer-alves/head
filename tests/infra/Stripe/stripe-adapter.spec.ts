import { describe, expect, it } from 'vitest'
import { StripeAdapter } from '@/infra/Stripe/http/stripe-adapter'

type SutTypes = {
  sut: StripeAdapter
}

const makeSut = (): SutTypes => {
  const sut = new StripeAdapter()

  return {
    sut,
  }
}

describe('Stripe Adapter - Customer', () => {
  it('Should instantiate StripeAdapter correctly', () => {
    const { sut } = makeSut()
    expect(sut).toBeInstanceOf(StripeAdapter)
  })
})
