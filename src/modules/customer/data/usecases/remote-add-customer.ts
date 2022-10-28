import { HttpClient } from '@/common/http'
import { AddCustomer } from '@customer/domain/usecases'

export class RemoteAddCustomer {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<AddCustomer.Model>,
  ) {}
  async exec(params: AddCustomer.Params): Promise<any> {
    return this.httpClient.request({
      method: 'post',
      url: this.url,
      body: params,
    })
  }
}

export namespace RemoteAddCustomer {
  export type Model = AddCustomer.Model
  export type Params = AddCustomer.Params
}
