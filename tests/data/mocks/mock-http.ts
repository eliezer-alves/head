import {
  HttpRequest,
  HttpResponse,
  HttpStatus,
  HttpClient,
} from '@/data/protocols/http'

import { faker } from '@faker-js/faker'

export const mockHttpRequest = (): HttpRequest => ({
  url: faker.internet.url(),
  method: faker.helpers.arrayElement(['get', 'post', 'put', 'delete']),
  body: faker.helpers.arrayElements(),
  headers: faker.helpers.arrayElements(),
})

export const mockDeleteHttpRequest = (): HttpRequest => ({
  url: faker.internet.url(),
  method: 'delete',
  body: {
    id: faker.datatype.uuid(),
  },
})

export class HttpClientSpy<R = any> implements HttpClient<R> {
  url?: string
  method?: string
  body?: any
  headers?: any
  response: HttpResponse<R> = {
    status: HttpStatus.ok,
  }

  async request(data: HttpRequest): Promise<HttpResponse<R>> {
    this.url = data.url
    this.method = data.method
    this.body = data.body
    this.headers = data.headers
    return this.response
  }
}
