import React from 'react'
import ICONS from '../../assets/constants/icons'
import Calendar from '../../components/Mists/Calender'
import WorkoutTrackingChart from '../../components/Mists/WorkoutTrackingChart'

const UserHome = () => {
  
  return (
    <div>
      <div className='flex flex-col lg:flex-row w-auto'>
        <div className='lg:w-3/5 w-auto md:ml-4'>
          <div className='grid grid-cols-2 gap-4 mt-5'>
            <div className='border-2 border-black dark:border-white px-5 py-6 sm:px-20 sm:py-10 bg-[#fffeca] flex flex-col items-center justify-center rounded-3xl'>
              <i><ICONS.CLOCK fontSize={28} /></i>
              <p className='text-zinc-700 mt-2 text-sm sm:text-md'>Time</p>
              <p className='text-lg sm:text-3xl font-bold'>56m</p>
            </div>
            <div className='border-2 border-black dark:border-white px-5 py-6 sm:px-20 sm:py-10 bg-[#d5c7ec] flex flex-col items-center justify-center rounded-3xl'>
              <i><ICONS.DISTANCE fontSize={30} /></i>
              <p className='text-zinc-700 mt-3 text-sm sm:text-md'>Total distance</p>
              <p className='text-lg sm:text-3xl font-bold'>15 h 5km</p>
            </div>
            <div className='border-2 border-black dark:border-white px-5 py-6 sm:px-20 sm:py-10 bg-[#fad6ec] flex flex-col items-center justify-center rounded-3xl'>
              <i><ICONS.FIRE fontSize={30} /></i>
              <p className='text-zinc-700 mt-2 text-sm sm:text-md'>Energy burn</p>
              <p className='text-lg sm:text-3xl font-bold'>1 345 kal</p>
            </div>
            <div className='border-2 border-black dark:border-white px-5 py-6 sm:px-20 sm:py-10 bg-[#c5e0e0] flex flex-col items-center justify-center rounded-3xl'>
              <i><ICONS.MOON fontSize={30} /></i>
              <p className='text-zinc-700 mt-2 text-sm sm:text-md'>Sleep</p>
              <p className='text-lg sm:text-3xl font-bold'>56m</p>
            </div>
          </div>

          <div className='grid sm:grid-cols-3 gap-4 mt-8'>
            <div className='border-2 border-black dark:border-white bg-[#1b1b1c] py-8 px-10 flex flex-col items-center justify-center rounded-3xl'>
              <i className='text-white text-5xl'><ICONS.SHOEDOWN /></i>
              <p className='text-zinc-400 mt-2'>Contact</p>
              <p className='text-lg  font-bold text-white'>17 min</p>
              <p className='text-zinc-400 mt-2'>Fight time</p>
              <p className='text-lg  font-bold text-white'>17 min</p>
            </div>
            <div className='border-2 border-black dark:border-white bg-[#1b1b1c] py-8 px-10 flex flex-col items-center justify-center rounded-3xl'>
              <i className='text-white text-5xl'><ICONS.SHOEUP /></i>
              <p className='text-zinc-400 mt-2'>Contact</p>
              <p className='text-lg  font-bold text-white'>17 min</p>
              <p className='text-zinc-400 mt-2'>Fight time</p>
              <p className='text-lg  font-bold text-white'>17 min</p>
            </div>
            <div className='border-2 border-black dark:border-white bg-[#1b1b1c] py-8 md:py-14 px-10 flex flex-col items-center justify-center rounded-3xl'>
              <i className='mt-2 text-white text-5xl'><ICONS.CHART2 /></i>
              <p className='text-zinc-400 mt-2'>Symentry</p>
              <i className='text-white text-5xl'><ICONS.CHART1 /></i>
              <p className='text-lg  font-bold text-white'>99%</p>
            </div>
          </div>
        </div>
{/* 3rd col */}
        <div className='border-2 border-black dark:border-white lg:w-2/5 w-auto bg-[#1b1b1c] m-4 p-6 rounded-3xl min-h-screen'>
          <p className='text-3xl text-white'>Activity Tracking</p>
          <p className='text-zinc-400'>Tuesday, 26 November</p>
          <div>
            <Calendar/>
            <WorkoutTrackingChart/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserHome
