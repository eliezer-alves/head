import { render } from '@testing-library/react'
import { SignUp } from '@/presentaion/pages'

describe('SignUp Component', () => {
  it('Should start with initial state', () => {
    const { getByTestId } = render(<SignUp />)
    const submitButton = getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)
  })
})
