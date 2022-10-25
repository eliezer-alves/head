import { HttpClient, HttpRequest, HttpStatus } from '@/common/http'
import { AdapterFirestore } from '@/infra/Firebase'
import { FirestoreErrorCode, MockFirestore } from './mocks'
import { faker } from '@faker-js/faker'

jest.mock('firebase/firestore')

const mockDeleteHttpRequest = (): HttpRequest => ({
  url: faker.internet.url(),
  method: 'delete',
  body: {
    id: faker.datatype.uuid(),
  },
})

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
      deleteRequest.body.id,
    )

    expect(mockedFirebaseSDK.deleteDoc).toHaveBeenCalledWith({
      id: deleteRequest.body.id,
      path: deleteRequest.url,
    })
  })

  test('Should return correct response', async () => {
    const { sut, mockFirestore } = makeSut()
    const deleteRequest = mockDeleteHttpRequest()
    const expectedResponse = {
      status: HttpStatus.ok,
    }

    mockFirestore.mockDoc(deleteRequest.body.id, deleteRequest.url)
    mockFirestore.mockDeleteDoc()

    const response = await sut.request(deleteRequest)

    expect(expectedResponse).toEqual(response)
  })

  test('Should returns 401 if firebase returns PERMISSION_DENIED', async () => {
    const { sut, mockFirestore } = makeSut()
    mockFirestore.throwError(FirestoreErrorCode.PERMISSION_DENIED)
    mockFirestore.mockDeleteDoc()

    const response = await sut.request(mockDeleteHttpRequest())

    expect(response.status).toBe(HttpStatus.unauthorized)
  })

  test('Should return 400 if Firebase returns any errors', async () => {
    const { sut, mockFirestore } = makeSut()
    mockFirestore.throwError(FirestoreErrorCode.ANY)
    mockFirestore.mockDeleteDoc()

    const response = await sut.request(mockDeleteHttpRequest())

    expect(response.status).toBe(HttpStatus.badRequest)
  })
})
