import { HttpMethod } from '@/common/http'
import { StripeCustomer } from '.'

export const StripeResource = (resource: string, method: HttpMethod) => {
  if (resource == '/customer') return StripeCustomer(method)
}
