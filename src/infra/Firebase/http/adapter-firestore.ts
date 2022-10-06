import {
  HttpClient,
  HttpRequest,
  HttpResponse,
  HttpStatus,
} from '@/data/protocols/http'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'

import { db } from '../config/connection'
import { addDoc, collection, DocumentReference } from 'firebase/firestore'

type ExpectedCreateResponse = {
  id: string
}

export class AdapterFirestore implements HttpClient {
  public response: HttpResponse<any> = {
    status: HttpStatus.ok,
  }

  private changeResponseError(e: any): void {
    switch (e.code) {
      case 'PERMISSION_DENIED':
        this.response.status = HttpStatus.unauthorized
        break
      case 'NOT_FOUND':
        this.response.status = HttpStatus.forbidden
        break
      default:
        this.response.status = HttpStatus.badRequest
        break
    }
  }

  async create(ref: string, data: any): Promise<void> {
    let firestoreResponse: DocumentReference<any>

    firestoreResponse = await addDoc(collection(db, ref), data)

    if (firestoreResponse?.id) {
      this.response.status = HttpStatus.ok
      this.response.body = {
        id: firestoreResponse.id,
      }
    } else {
      this.response = {
        status: HttpStatus.badRequest,
      }
    }
  }

  async request(data: HttpRequest): Promise<HttpResponse> {
    try {
      switch (data.method) {
        case 'post':
          await this.create(data.url, data.body)
          break
        default:
          break
      }
    } catch (e: any) {
      this.changeResponseError(e)
    }

    return this.response
  }
}
