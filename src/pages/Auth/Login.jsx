import React from 'react'
import login from '../../assets/images/login.png'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className='flex col lg:row h-screen'>
      <div className='w-1/2 hidden lg:block'>
<img src={login} alt="" className='h-full' />
      </div>

      <div className='flex items-center flex-col justify-center lg:w-1/2 w-screen'>
      <h3 className='text-3xl font-bold border-b-'>Welcome Back,</h3>
<form>
    <div className='flex flex-col'>
    <label className='mt-3 font-bold'>Email</label>
    <input type="text" className='bg-[#fafafa] w-72 md:w-96 p-2 border-2 border-[#262135] rounded-md' placeholder='fiza@gmail.com..' />
    <label className='mt-3 font-bold'>Password</label>
    <input type="text" className='bg-[#fafafa] w-72 md:w-96 p-2 border-2 border-[#262135] rounded-md' placeholder='12345' />
    <button className='p-3 text-lg text-white font-bold bg-[#262135] rounded-md mt-4'>Login</button>
    <p className='mt-2'>Don't have an account? <Link to={'/signup'} className='text-blue-500'>Signup</Link></p>
    </div>
</form>
      </div>

    </div>
  )
}

export default Login
