import { Main, Page } from '@/presentaion/components'
import { useRef, useState } from 'react'

export const NewCustomer = () => {
  const [formIsValid, setFormIsValid] = useState(false)
  const nameRef = useRef<any>()
  const emailRef = useRef<any>()

  const validateForm = () => {
    const isValid =
      nameRef.current.checkValidity() && emailRef.current.checkValidity()

    setFormIsValid(!!isValid)
  }

  return (
    <Page>
      <Main>
        <h2 className="mb-10">Become a Customer!</h2>
        <form onChange={validateForm}>
          <input
            id="test"
            ref={nameRef}
            type="text"
            minLength={3}
            maxLength={60}
            required
            placeholder="name*"
            className="w-full mb-2"
          />
          <input
            ref={emailRef}
            type="email"
            required
            placeholder="e-mail*"
            className="w-full mb-2"
          />

          <button
            data-testid="submit"
            disabled={!formIsValid}
            type="submit"
            className="btn btn-primary w-full"
          >
            &emsp;Go&emsp;
          </button>
        </form>
      </Main>
    </Page>
  )
}
