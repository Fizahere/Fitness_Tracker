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
        <Route path='/dashboard/' element={<UserHome />} />
        <Route path='/dashboard/home' element={<UserHome />} />
        <Route path='/dashboard/workout' element={<UserWorkout />} />
        <Route path='/dashboard/nutrition' element={<Nutrition />} />
        <Route path='/dashboard/progress' element={<Progress />} />
        <Route path='/dashboard/profile' element={<UserProfile />} />
      </Route>
      <Route path='*' element={<Notfound />} />
    </Routes>
  )
}

export default AuthenticatedRoutes
