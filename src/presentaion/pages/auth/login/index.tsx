import { AuthProvider } from '@/common/auth-provider'
import { AdapterAuthProvider } from '@/infra/Firebase'
import { RemoteLogin } from '@/modules/auth/data/usecases'
import { Main, Page } from '@/presentaion/components'
import googleIcon from './img/google-icon.png'

export const Login = () => {
  const handleLogin = async () => {
    const authProvider: AuthProvider = new AdapterAuthProvider()
    const makeLogin = new RemoteLogin(authProvider)

    await makeLogin.exec()
  }
  return (
    <Page>
      <Main>
        <div
          onClick={handleLogin}
          className="flex gap-2 items-center cursor-pointer p-2 border border-gray-400 rounded-sm hover:opacity-80"
        >
          <img src={googleIcon} alt="Google icon" width="32px" />
          <span className="font-bold text-gray-600">Sign in with Google</span>
        </div>
      </Main>
    </Page>
  )
}
