import React from 'react'
import { Route, Routes } from 'react-router-dom'
import UserHome from '../pages/Dashboard/UserHome'
import Notfound from '../pages/Notfound'
import Dashboard from '../components/Dashboard'
import UserProfile from '../pages/Dashboard/UserProfile'
import UserWorkout from '../pages/Dashboard/UserWorkout'
import Nutrition from '../pages/Dashboard/Nutrition'
import Progress from '../pages/Dashboard/Progress'

const AuthenticatedRoutes = () => {
  return (
    <Routes>
      <Route element={<Dashboard />}>
        <Route path='/' element={<UserHome />} />
        <Route path='/home' element={<UserHome />} />
        <Route path='/workout' element={<UserWorkout />} />
        <Route path='/nutrition' element={<Nutrition />} />
        <Route path='/progress' element={<Progress />} />
        <Route path='/profile' element={<UserProfile />} />
      </Route>
      <Route path='*' element={<Notfound />} />
    </Routes>
  )
}

export default AuthenticatedRoutes
