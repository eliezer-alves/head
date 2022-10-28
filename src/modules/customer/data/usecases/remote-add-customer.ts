import { AccessDeniedError, UnexpectedError } from '@/common/errors'
import { HttpClient, HttpStatus } from '@/common/http'
import { AddCustomer } from '@customer/domain/usecases'

export class RemoteAddCustomer {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<AddCustomer.Model>,
  ) {}
  async exec(params: AddCustomer.Params): Promise<AddCustomer.Model> {
    const httpResponse = await this.httpClient.request({
      method: 'post',
      url: this.url,
      body: params,
    })

    switch (httpResponse.status) {
      case HttpStatus.ok:
        return httpResponse.body
      case HttpStatus.forbidden:
        throw new AccessDeniedError()
      default:
        throw new UnexpectedError()
    }
  }
}

export namespace RemoteAddCustomer {
  export type Model = AddCustomer.Model
  export type Params = AddCustomer.Params
}
