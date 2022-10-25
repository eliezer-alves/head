/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpClient, HttpResponse, HttpStatus } from '@/common/http'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'

type ApppwriteResponse = any

export class AppwriteHttpClient implements HttpClient {
  private defaultResponse: HttpResponse = {
    status: HttpStatus.badRequest,
  }

  async request(): Promise<HttpResponse> {
    let response: ApppwriteResponse
    try {
      response = this.defaultResponse
    } catch (e: any) {
      if (e.code === 'PERMISSION_DENIED') {
        throw new AccessDeniedError()
      }

      throw new UnexpectedError()
    }

    return response
  }
}
