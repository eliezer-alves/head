import { HttpClient, HttpRequest, HttpStatus } from '@/data/protocols/http'
import { AdapterFirestore } from '@/infra/Firebase'
import { mockAddAccountParams } from '../../domain/mocks'
import { FirestoreErrorCode, mockAddDocResponse, MockFirestore } from './mocks'

jest.mock('firebase/firestore')

const addNewUserRequest: HttpRequest = {
  url: 'users/',
  method: 'post',
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

describe('AdapterHttpFirestoreCreate', () => {
  test('Should call firebase with correct values', async () => {
    const { sut, mockFirestore } = makeSut()
    const mockedFirebaseSDK = mockFirestore.mockAddDock()

    await sut.request(addNewUserRequest)

    expect(mockedFirebaseSDK.addDoc).toHaveBeenCalledWith(
      undefined,
      addNewUserRequest.body
    )
  })

  test('Should return correct response', async () => {
    const { sut, mockFirestore } = makeSut()
    const addDockResponse = mockAddDocResponse()
    const expectedResponse = {
      status: HttpStatus.ok,
      body: addDockResponse,
    }

    mockFirestore.mockAddDock(addDockResponse)

    const response = await sut.request(addNewUserRequest)

    expect(expectedResponse).toEqual(response)
  })

  test('Should returns 401 if firebase returns PERMISSION_DENIED', async () => {
    const { sut, mockFirestore } = makeSut()
    mockFirestore.throwError(FirestoreErrorCode.PERMISSION_DENIED)
    mockFirestore.mockAddDock()

    const response = await sut.request(addNewUserRequest)

    expect(response.status).toBe(HttpStatus.unauthorized)
  })
})
