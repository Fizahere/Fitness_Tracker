import React from 'react'
import login from '../assets/images/login.png'
import COLORS from '../assets/constants/colors'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className='flex col lg:row h-screen'>
      <div className='w-1/2 hidden lg:block'>
      {/* <div className='absolute grid grid-cols-2 gap-8 p-32'>
        <div className={`w-80 flex justify-center items-center rounded-lg bg-[#bbb2cd] p-4`}>
            <p className='text-2xl text-white font-bold'>Hello,</p>
        </div>
        <div className='w-80 flex justify-center items-center rounded-lg bg-[#6a4b5d] p-4'>
        <p className='text-2xl text-white font-bold'>Achieve Your Goal.</p>
        </div>
        <div className='w-80 flex justify-center items-center rounded-lg bg-[#9dcbc9] p-4'>
        <p className='text-2xl text-white font-bold'>TRACKIT!</p>
        </div>
        <div className='w-80 flex justify-center items-center rounded-lg bg-[#e5b875] p-4'>
        <p className='text-2xl text-white font-bold'>Fitness Tracker.</p>
        </div>
      </div> */}
<img src={login} alt="" className='h-full' />
      </div>

      <div className='flex items-center flex-col justify-center lg:w-1/2 w-screen'>
      <h3 className='text-3xl font-bold border-b-'>Welcome Back,</h3>
<form>
    <div className='flex flex-col'>
    <label className='mt-3 font-bold'>Email</label>
    <input type="text" className='bg-gray-200 w-72 md:w-96 p-2 border-2 border-black rounded-md' placeholder='fiza@gmail.com..' />
    <label className='mt-3 font-bold'>Password</label>
    <input type="text" className='bg-gray-200 w-72 md:w-96 p-2 border-2 border-black rounded-md' placeholder='12345' />
    <button className='p-3 text-lg font-bold bg-[#e5b875]  rounded-md mt-4'>Login</button>
    <p>Don't have an account? <Link to={'/signup'} className='text-blue-500'>Signup</Link></p>
    </div>
</form>
      </div>

    </div>
  )
}

export default Login
