import React from 'react'
import login from '../assets/images/login.png'
import { Link } from 'react-router-dom'

const Signup = () => {
  return (
    <div className='flex col lg:row h-screen'>
      <div className='w-1/2 hidden lg:block'>
        <img src={login} alt="" className='h-full' />
      </div>
      <div className='flex items-center flex-col justify-center lg:w-1/2 w-screen'>
        <h3 className='text-3xl font-bold border-b-'>Create Account</h3>
        <form>
          <div className='flex flex-col'>
            <label className='mt-3 font-bold'>Username</label>
            <input type="text" className='bg-gray-200 w-72 md:w-96 p-2 border-2 border-black rounded-md' placeholder='Fiza..' />
            <label className='mt-3 font-bold'>Email</label>
            <input type="text" className='bg-gray-200 w-72 md:w-96 p-2 border-2 border-black rounded-md' placeholder='fiza@gmail.com..' />
            <label className='mt-3 font-bold'>Password</label>
            <input type="text" className='bg-gray-200 w-72 md:w-96 p-2 border-2 border-black rounded-md' placeholder='12345' />
            <button className='p-3 text-lg font-bold bg-[#e5b875]  rounded-md mt-4'>Sign Up</button>
            <p>Already have an account? <Link to={'/login'} className='text-blue-500'>Login</Link></p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup
