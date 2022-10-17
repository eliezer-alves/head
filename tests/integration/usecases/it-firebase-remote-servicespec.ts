import { HttpStatus } from '@/data/protocols/http'
import { RemoteAddAccount } from '@/data/usecases'
import { AdapterFirestore } from '@/infra/Firebase'
import { mockAddAccountParams, mockAddAccountModel } from '@/tests/domain/mocks'

const context = {
  id: null,
}

const httpClient = new AdapterFirestore()

describe('FirebaseRemoteService', () => {
  test('Should return an AddAccount.Model if HttpClient returns 200', async () => {
    const sut = new RemoteAddAccount('users-test', httpClient)
    const httpResult = mockAddAccountModel()

    const accountParams = {
      ...mockAddAccountParams(),
      name: httpResult.name,
    }

    const account = await sut.add(accountParams)
    context.id = account.id

    expect(account)
  })

  // test('HttpClient should return 200 when deleting an existing record', async () => {
  //   if (!context.id) return

  //   const sut = new RemoteRemoveAccount('users-test', httpClient)
  //   const httpResult = {
  //     status: HttpStatus.ok,
  //   }

  //   const response = await sut.add(accountParams)

  //   expect(response).toEqual(httpResult)
  // })
})
