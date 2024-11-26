import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'
import Contact from '../pages/Contact'
import Notfound from '../pages/Notfound'
import Signup from '../pages/Auth/Signup'
import Login from '../pages/Auth/Login'

const UnAuthenticatedRoutes = () => {
  return (
    <Routes>
      <Route>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
      </Route>
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='*' element={<Notfound />} />
    </Routes>
  )
}

export default UnAuthenticatedRoutes
