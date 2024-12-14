import React from 'react'
import { Link } from 'react-router-dom'
import image from '../assets/images/404.webp'
const Notfound = () => {
  return (
    <div className='h-screen w-screen flex flex-col items-center justify-center'>
{/* <div className="h-72 w-96 bg-pink-300 flex flex-col justify-center items-center rounded-3xl shadow-2xl shadow-slate-800 border-2 border-black">
<h3 className='text-4xl font-bold mb-10 font-serifnpm run dev
'>404: 'NotFound'</h3>
<button className='bg-[#262135] text-white px-10 py-3 rounded-lg'>
  <Link to={'/'}>Go Back</Link>
</button> */}
{/* </div> */}
<h3 className='text-4xl font-serif'>NOT FOUND</h3>
<img src={image} alt="" />
    </div>
  )
}

export default Notfound
