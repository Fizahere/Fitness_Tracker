import React from 'react'
import bgImage from '../../assets/images/mainImage.jpg'
import ICONS from '../../assets/constants/icons'

const UserProfile = () => {
  return (
    <div>
      <div className='relative'>
        <img src={bgImage} className='h-72 w-screen' alt="" />
        <div className='absolute top-36 left-12 lg:left-20 border-2 border-gray-500 rounded-full p-1 h-64 w-64'><img src={'https://i.pinimg.com/736x/67/6f/15/676f1545c9539c15809b3c5595b6986f.jpg'} className='h-full w-full bg-contain rounded-full' alt="" /></div>
        <div className='flex flex-col md:flex-row justify-around mt-4'>
          <div className='md:w-7/12'>
            <p className='dark:text-white text-black font-bold text-3xl mt-28 lg:mt-0 lg:ml-[22rem] text-center lg:text-left'>Fiza -</p>
            <p className='text-gray-400 lg:ml-[22rem] text-center lg:text-left'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio, aperiam.</p>
            <div className='bg-gradient-to-t from-[#efeeb6] to-[#1b1b1c] rounded-3xl p-4 lg:p-8 text-white mt-4 lg:mt-10 flex lg:justify-around'>
              <div className='text-lg font-bold'>
                <p>Name:</p>
                <p>About:</p>
                <p>Email:</p>
              </div>
              <div className='text-lg ml-2 md:ml-0'>
                <p>Fiza -</p>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio, aperiam.</p>
                <p>fizabatool028@gmail.com</p>
                <div className='flex justify-end mt-4 cursor-pointer'>
                <button className='bg-white px-5 py-2 rounded-full text-black' title='edit your information'>
                  <i><ICONS.PENCIL/></i>
                </button>
                </div>
              </div>
            </div>
          </div>
          <div className='p-8 bg-gradient-to-t from-[#fcc6e6] to-[#1b1b1c] rounded-3xl lg:w-2/5 my-4 lg:mt-0'>
            <div className='flex text-white justify-between'>
              <p className='text-2xl font-bold'>Month reports</p>
              <p>/2024</p>
            </div>
            <ul>
              <li className='py-4 mt-6 px-6 rounded-full flex justify-between items-center cursor-pointer bg-[#fcc6e6] hover:bg-opacity-90'>
                <p>running, monday</p>
                <i><ICONS.RUN /></i>
              </li>
              <li className='py-4 mt-4 px-6 rounded-full flex justify-between items-center cursor-pointer bg-[#262135] text-white hover:bg-opacity-90'>
                <p>Bedtime, monday</p>
                <i><ICONS.SLEEP /></i>
              </li>
              <li className='py-4 mt-4 px-6 rounded-full flex justify-between items-center cursor-pointer bg-[#262135] text-white hover:bg-opacity-90'>
                <p>Meal, monday</p>
                <i><ICONS.MEAL /></i>
              </li>
              <li className='flex justify-end mt-4 cursor-pointer'>
                <p className='text-black bg-white px-3 py-2 rounded-full text-center'>
                  See All
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
