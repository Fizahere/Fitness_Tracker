import React from 'react'
import { Route, Routes } from 'react-router-dom'
import UserHome from '../pages/Dashboard/UserHome'
import Notfound from '../pages/Notfound'
import Dashboard from '../components/Dashboard'
import UserProfile from '../pages/Dashboard/UserProfile'
import UserWorkout from '../pages/Dashboard/UserWorkout'
import Nutrition from '../pages/Dashboard/Nutrition'
import Progress from '../pages/Dashboard/Progress'
import Posts from '../pages/Dashboard/Posts'
import MainLayout from '../components/MainLayout'
import ExploreUsers from '../pages/ExploreUsers'
import Profile from '../pages/Profiles'

const AuthenticatedRoutes = ({ setIsAuthenticated }) => {
  return (
    <Routes>
      <Route element={<Dashboard setIsAuthenticated={setIsAuthenticated} />}>
        <Route path='/dashboard' element={<UserHome />} />
        <Route path='/home' element={<UserHome />} />
        <Route path='/workout' element={<UserWorkout />} />
        <Route path='/nutrition' element={<Nutrition />} />
        <Route path='/posts' element={<Posts />} />
        <Route path='/progress' element={<Progress />} />
        <Route path='/profile' element={<UserProfile />} />
      </Route>
      <Route element={<MainLayout setIsAuthenticated={setIsAuthenticated} />} >
        <Route path='/explore' element={<ExploreUsers />} />
        <Route path='/visit-profile/:id' element={<Profile />} />
      </Route>
      <Route path='/' element={<MainLayout />} />

      <Route path='*' element={<Notfound />} />
    </Routes>
  )
}

export default AuthenticatedRoutes
