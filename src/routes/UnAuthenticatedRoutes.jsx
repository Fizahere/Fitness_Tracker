import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Notfound from '../pages/Notfound'
import MainLayout from '../components/MainLayout'
import Login from '../pages/Auth/Login'
import Signup from '../pages/Auth/Signup'

const UnAuthenticatedRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />} />
      <Route path='/login' element={<Login />} />
      <Route path='/create-new-account' element={<Signup />} />
      <Route path='*' element={<Notfound />} />
    </Routes>
  )
}

export default UnAuthenticatedRoutes
