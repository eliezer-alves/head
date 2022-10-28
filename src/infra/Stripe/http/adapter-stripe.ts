import { HttpRequest, HttpResponse, HttpStatus } from '@/common/http'
import { StripeErrors } from './stripe-errors'

// const resourceAdapter = (resource: string, httpMethod: HttpMethod) => {
//   if
// }

export class AdapterStripe {
  public response: HttpResponse<any> = {
    status: HttpStatus.ok,
  }

  private changeResponseError(err: any): void {
    switch (err.type as StripeErrors) {
      case 'StripeCardError':
        // A declined card error
        err.message // => e.g. "Your card's expiration year is invalid."
        break
      case 'StripeRateLimitError':
        // Too many requests made to the API too quickly
        break
      case 'StripeInvalidRequestError':
        // Invalid parameters were supplied to Stripe's API
        break
      case 'StripeAPIError':
        // An error occurred internally with Stripe's API
        break
      case 'StripeConnectionError':
        // Some kind of error occurred during the HTTPS communication
        break
      case 'StripeAuthenticationError':
        // You probably used an incorrect API key
        break
      default:
        this.response.status = HttpStatus.badRequest
        break
    }
  }

  async request(data: HttpRequest): Promise<HttpResponse> {
    try {
      this.response.body = data
    } catch (e: any) {
      this.changeResponseError(e)
    }
    return this.response
  }
}
