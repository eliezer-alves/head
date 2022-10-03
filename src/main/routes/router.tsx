import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { SignUp } from '../../presentaion/pages'

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  )
}
