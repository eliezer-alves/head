import { RemoteAddAccount } from '@user/data/usecases'
import { AdapterFirestore } from '@/infra/Firebase'
import {
  mockAddAccountParams,
  mockAddAccountModel,
} from '@/../tests/modules/user/domain/mocks'

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
})
