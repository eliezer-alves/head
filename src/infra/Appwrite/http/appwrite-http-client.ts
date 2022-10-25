/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  HttpClient,
  HttpRequest,
  HttpResponse,
  HttpStatus,
} from '@/data/protocols/http'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'

type ApppwriteResponse = any

export class AppwriteHttpClient implements HttpClient {
  private defaultResponse: HttpResponse = {
    status: HttpStatus.badRequest,
  }

  async request(data: HttpRequest): Promise<HttpResponse> {
    let response: ApppwriteResponse
    try {
      response = this.defaultResponse
      //   switch (data.method) {
      //     case 'post':
      //       response = this.defaultResponse
      //       break
      //     default:
      //       response = this.defaultResponse
      //       break
      //   }
    } catch (e: any) {
      if (e.code === 'PERMISSION_DENIED') {
        throw new AccessDeniedError()
      }

      throw new UnexpectedError()
    }

    return response
  }
}
