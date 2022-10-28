import { Stripe } from 'stripe'

let stripe = new Stripe(import.meta.env.VITE_STRIPE_API_KEY, {
  apiVersion: '2022-08-01',
})

export { stripe }
