import React from 'react'
import { Route, Routes } from 'react-router-dom'
import UserHome from '../pages/Dashboard/UserHome'
import Notfound from '../pages/Notfound'

const AuthenticatedRoutes = () => {
  return (
    <Routes>
      <Route>
        <Route path='/' element={<UserHome />} />
        <Route path='/home' element={<UserHome />} />
      </Route>
      <Route path='*' element={<Notfound />} />
    </Routes>
  )
}

export default AuthenticatedRoutes
