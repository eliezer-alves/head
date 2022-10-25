import {
  HttpClient,
  HttpRequest,
  HttpResponse,
  HttpStatus,
} from '@/common/http'

import { db } from '../config/connection'
import {
  addDoc,
  deleteDoc,
  doc,
  collection,
  DocumentReference,
} from 'firebase/firestore'

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

  async #addDoc(ref: string, data: any): Promise<void> {
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

  async #deleteDoc(ref: string, id: string): Promise<void> {
    try {
      const docRef = doc(db, ref, id)
      await deleteDoc(docRef)
    } catch (e: any) {
      this.changeResponseError(e)
    }
  }

  async request(data: HttpRequest): Promise<HttpResponse> {
    try {
      switch (data.method) {
        case 'post':
          await this.#addDoc(data.url, data.body)
          break
        case 'delete':
          await this.#deleteDoc(data.url, data.body.id)
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
