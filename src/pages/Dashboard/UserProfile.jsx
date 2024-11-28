import React from 'react'
import bgImage from '../../assets/images/mainImage.jpg'
import profilePicture from '../../assets/images/profile.jpg'
import ICONS from '../../assets/constants/icons'

const UserProfile = () => {
  return (
    <div>
      <div className='relative'>
        <img src={bgImage} className='h-72 w-screen' alt="" />
        <div className='absolute top-36 left-20 border-2 border-gray-500 rounded-full p-1 h-64 w-64'><img src={'https://i.pinimg.com/736x/67/6f/15/676f1545c9539c15809b3c5595b6986f.jpg'} className='h-full w-full bg-contain rounded-full' alt="" /></div>
        <div className='ml-[22rem] flex justify-around mt-4'>
          <div>
            <p className='text-white font-bold text-3xl'>Fiza</p>
            <p className='text-gray-400'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio, aperiam.</p>
          </div>
          <div className='p-8 bg-gradient-to-t from-[#fcc6e6] to-[#1b1b1c] rounded-3xl w-2/5'>
            <div className='flex text-white justify-between'>
              <p className='text-2xl font-bold'>Month reports</p>
              <p>/2024</p>
            </div>
            <ul>
              <li className='py-4 mt-6 px-6 rounded-full flex justify-between items-center cursor-pointer bg-[#fcc6e6]'>
                <p>running, monday</p>
                <i><ICONS.CLOCK /></i>
              </li>
              <li className='py-4 mt-4 px-6 rounded-full flex justify-between items-center cursor-pointer bg-[#262135] text-white'>
                <p>running, monday</p>
                <i><ICONS.CLOCK /></i>
              </li>
              <li className='py-4 mt-4 px-6 rounded-full flex justify-between items-center cursor-pointer bg-[#262135] text-white'>
                <p>running, monday</p>
                <i><ICONS.CLOCK /></i>
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
