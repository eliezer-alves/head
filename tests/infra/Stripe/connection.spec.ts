import { describe, expect, it } from 'vitest'
import { stripe } from '@/infra/Stripe/config/connection'
import Stripe from 'stripe'

describe('Connection Stripe', () => {
  it('Should environment variables must be different from null', () => {
    expect(import.meta.env.VITE_STRIPE_API_KEY.length).not.toBe(0)
  })

  it('Should Stripe instance must be different from null', () => {
    expect(stripe).toBeInstanceOf(Stripe)
  })
})
