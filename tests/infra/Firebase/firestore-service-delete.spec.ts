import { HttpClient, HttpRequest } from '@/data/protocols/http'
import { AdapterFirestore } from '@/infra/Firebase'
import { mockDeleteHttpRequest } from '../../data/mocks'
import { mockAddAccountParams } from '../../domain/mocks'
import { MockFirestore } from './mocks'

jest.mock('firebase/firestore')

const addNewUserRequest: HttpRequest = {
  url: 'users/',
  method: 'delete',
  body: mockAddAccountParams(),
}

type SutTypes = {
  sut: HttpClient
  mockFirestore: MockFirestore
}

const makeSut = (): SutTypes => {
  const sut = new AdapterFirestore()
  const mockFirestore = new MockFirestore()

  return {
    sut,
    mockFirestore,
  }
}

describe('AdapterHttpFirestoreDelete', () => {
  test('Should call firebase with correct values', async () => {
    const { sut, mockFirestore } = makeSut()
    const mockedFirebaseSDK = mockFirestore.mockDeleteDoc()
    const deleteRequest = mockDeleteHttpRequest()
    mockFirestore.mockDoc(deleteRequest.body.id, deleteRequest.url)

    await sut.request(deleteRequest)

    expect(mockedFirebaseSDK.doc).toHaveBeenCalledWith(
      undefined,
      deleteRequest.url,
      deleteRequest.body.id
    )

    expect(mockedFirebaseSDK.deleteDoc).toHaveBeenCalledWith({
      id: deleteRequest.body.id,
      path: deleteRequest.url,
    })
  })

  // test('Should return correct response', async () => {
  //   const { sut, mockFirestore } = makeSut()
  //   const addDockResponse = mockAddDocResponse()
  //   const expectedResponse = {
  //     status: HttpStatus.ok,
  //     body: addDockResponse,
  //   }

  //   mockFirestore.mockAddDock(addDockResponse)

  //   const response = await sut.request(addNewUserRequest)

  //   expect(expectedResponse).toEqual(response)
  // })

  // test('Should returns 401 if firebase returns PERMISSION_DENIED', async () => {
  //   const { sut, mockFirestore } = makeSut()
  //   mockFirestore.throwError(FirestoreErrorCode.PERMISSION_DENIED)
  //   mockFirestore.mockAddDock()

  //   const response = await sut.request(addNewUserRequest)

  //   expect(response.status).toBe(HttpStatus.unauthorized)
  // })
})
