import { HttpClient, HttpStatus } from '@/common/http'
import { EmailInUseError, UnexpectedError } from '@/common/errors'
import { AddAccount } from '@user/domain/usecases'

export class RemoteAddAccount implements AddAccount {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteAddAccount.Model>,
  ) {}

  async add(params: AddAccount.Params): Promise<AddAccount.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'post',
      body: params,
    })
    switch (httpResponse.status) {
      case HttpStatus.ok:
        return httpResponse.body
      case HttpStatus.forbidden:
        throw new EmailInUseError()
      default:
        throw new UnexpectedError()
    }
  }
}

export namespace RemoteAddAccount {
  export type Model = AddAccount.Model
}
