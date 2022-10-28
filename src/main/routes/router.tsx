import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login, SignUp, NewCustomer } from '@/presentaion/pages'

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<Login />} />
        <Route path={'/signup'} element={<SignUp />} />
        <Route path={'/customers-new'} element={<NewCustomer />} />
      </Routes>
    </BrowserRouter>
  )
}
