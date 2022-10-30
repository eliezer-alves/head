import { describe, expect, it } from 'vitest'
import { stripe } from '@/infra/Stripe/config/connection'
import { StripeResource } from '@/infra/Stripe/resources'

describe('Stripe Resourcer', () => {
  it("Should correctly instantiate Stripe's customers.create resource", async () => {
    const sut = StripeResource('/customer', 'post')
    expect(sut).equals(stripe.customers.create)
  })
})
