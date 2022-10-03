import { Main, Page } from '../../components'

export const SignUp = () => {
  return (
    <Page>
      <Main>
        <h2 className="mb-10">Sign Up!</h2>
        <form>
          <input type="text" placeholder="username" className="w-full mb-2" />
          <input type="text" placeholder="e-mail" className="w-full mb-2" />
          <input
            type="password"
            placeholder="password"
            className="w-full mb-2"
          />
          <input
            type="password"
            placeholder="confirm password"
            className="w-full mb-2"
          />
          <button type="submit" className="btn btn-primary w-full">
            &emsp;GO&emsp;
          </button>
        </form>
        <div className="separator">or</div>
        <span className="link-span">I already have an account</span>
      </Main>
    </Page>
  )
}
