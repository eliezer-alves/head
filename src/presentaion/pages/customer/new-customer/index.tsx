import { FormEvent, useRef, useState } from 'react'
import { Main, Page } from '@/presentaion/components'
import { AdapterFirestore } from '@/infra/Firebase'
import { RemoteAddCustomer } from '@/modules/customer/data/usecases'

const httpClient = new AdapterFirestore()
const addCustomer = new RemoteAddCustomer('test_stripe_customers', httpClient)

export const NewCustomer = () => {
  const [formIsValid, setFormIsValid] = useState(false)

  const nameRef = useRef<any>()
  const emailRef = useRef<any>()

  const resetForm = () => {
    nameRef.current.value = ''
    emailRef.current.value = ''
    setFormIsValid(false)
  }

  const validateForm = () => {
    const isValid =
      nameRef.current.checkValidity() && emailRef.current.checkValidity()

    setFormIsValid(!!isValid)
  }

  const handleSubit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addCustomer
      .exec({
        name: nameRef.current.value,
        email: emailRef.current.value,
      })
      .then(() => {
        resetForm()
      })
  }

  return (
    <Page>
      <Main>
        <h2 className="mb-10">Become a Customer!</h2>
        <form onChange={validateForm} onSubmit={handleSubit}>
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
