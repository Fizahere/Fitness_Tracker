import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Notfound from '../pages/Notfound'
import MainLayout from '../components/MainLayout'
import Login from '../pages/Auth/Login'
import Signup from '../pages/Auth/Signup'
import ExploreUsers from '../pages/ExploreUsers'
import Profile from '../pages/Profiles'

const UnAuthenticatedRoutes = ({setIsAuthenticated}) => {

  return (
    <Routes>
      <Route element={<MainLayout setIsAuthenticated={setIsAuthenticated} />} >
      <Route path='/explore' element={<ExploreUsers />} />
      <Route path='/visit-profile/:id' element={<Profile />} />
      </Route>
      <Route path='/' element={<MainLayout />} />
      <Route path='/login' element={<Login setIsAuthenticated={setIsAuthenticated}/>} />
      <Route path='/create-new-account' element={<Signup />} />
      <Route path='*' element={<Notfound />} />
    </Routes>
  )
}

export default UnAuthenticatedRoutes
