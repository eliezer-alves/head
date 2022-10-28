import { HttpMethod } from '@/common/http'
import { stripe } from '../config/connection'

export const StripeCustomer = (method: HttpMethod) => {
  switch (method) {
    case 'post':
      return stripe.customers.create
    case 'get':
      return stripe.customers.list
    case 'delete':
      return stripe.customers.del

    default:
      break
  }
}
