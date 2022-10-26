import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login, SignUp } from '@/presentaion/pages'

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<Login />} />
        <Route path={'/signup'} element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  )
}
