import React, { useMemo, useState } from 'react'
import ICONS from '../../assets/constants/icons'
import Calendar from '../../components/Mists/Calender'
import WorkoutBubbleChart from '../../components/Mists/WorkoutTrackingChart'
import NutritionChart from '../../components/Mists/NutritionChart'
import Clock from '../../components/Mists/Clock'
import { useQuery } from 'react-query'
import { WorkoutServices } from '../../services/WorkoutServices'
import ProgressChart from '../../components/Mists/ProgressChart'
import { UserServices } from '../../services/userServices'
import { getUserIdFromToken } from '../../services/authServices'
import { FaClock } from "react-icons/fa";
import { motion } from "framer-motion";
const UserHome = () => {
  const userId = getUserIdFromToken();
  const { data: caloryBurnData } = useQuery(
    'calory-burn-data', WorkoutServices.getCaloryBurn
  )
  const caloryBurnMemoData = useMemo(
    () => caloryBurnData?.data?.results, [caloryBurnData]
  )
  const { data: userData } = useQuery(
    ['user-data', userId], () => UserServices.getUser(userId)
  )
  const userMemoData = useMemo(
    () => userData?.data?.results, [userData]
  )
  return (
    <div>
      <div className='flex flex-col lg:flex-row w-auto'>
        <div className='lg:w-3/5 w-auto md:ml-4'>
          <div className='grid grid-cols-2 gap-4 mt-5'>
            <div className='border-2 border-black dark:border-white px-5 py-6 sm:px-20 sm:py-10 bg-[#fffeca] flex flex-col items-center justify-center rounded-3xl'>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              >
                <ICONS.CLOCK fontSize={30} />
              </motion.div>
              <p className='text-zinc-700 mt-2 text-sm sm:text-md'>Time</p>
              <p className='text-lg sm:text-3xl font-bold'>
                <Clock className={'animated-'} />
              </p>
            </div>
            <div className='border-2 border-black dark:border-white px-5 py-6 sm:px-20 sm:py-10 bg-[#d5c7ec] flex flex-col items-center justify-center rounded-3xl'>
              <i><ICONS.FOLLOWERS fontWeight={'bold'} fontSize={35} /></i>
              <p className='text-zinc-700 mt-3 text-sm sm:text-md'>Followers</p>
              <p className='text-lg sm:text-3xl font-bold'>{userMemoData?.followers.length}</p>
            </div>
            <div className='border-2 border-black dark:border-white px-5 py-6 sm:px-20 sm:py-10 bg-[#fad6ec] flex flex-col items-center justify-center rounded-3xl'>
              <i><ICONS.FIRE fontSize={30} /></i>
              <p className='text-zinc-700 mt-2 text-sm sm:text-md'>Energy burn</p>
              <p className='text-lg sm:text-3xl font-bold'>{caloryBurnMemoData && caloryBurnMemoData[0]} kal</p>
            </div>
            <div className='border-2 border-black dark:border-white px-5 py-6 sm:px-20 sm:py-10 bg-[#c5e0e0] flex flex-col items-center justify-center rounded-3xl'>
              <i><ICONS.WEIGHT fontSize={30} className='animate-bounce' /></i>
              <p className='text-zinc-700 mt-2 text-sm sm:text-md'>Weight</p>
              <p className='text-lg sm:text-3xl font-bold'>{userMemoData?.currentWeight} kg</p>
            </div>
          </div>

          <div className='grid sm:grid-cols-2 mt-8'>
            <div>
              <NutritionChart />
            </div>
            <div>
              <p className="text-xl text-center mb-6 font-bold text-black dark:text-white">Your Progress</p>
              <ProgressChart />
            </div>

            {/* <div className='border-2 border-black dark:border-white bg-[#1b1b1c] py-8 px-10 flex flex-col items-center justify-center rounded-3xl'>
              <i className='text-white text-5xl'><ICONS.SHOEDOWN /></i>
              <p className='text-zinc-400 mt-2'>Contact</p>
              <p className='text-lg  font-bold text-white'>17 min</p>
              <p className='text-zinc-400 mt-2'>Fight time</p>
              <p className='text-lg  font-bold text-white'>17 min</p>
            </div> */}
            {/* <div className='border-2 border-black dark:border-white bg-[#1b1b1c] py-8 px-10 flex flex-col items-center justify-center rounded-3xl'>
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
            </div> */}
          </div>
        </div>
        {/* 3rd col */}
        <div className='border-2 border-black dark:border-white lg:w-2/5 w-auto bg-[#1b1b1c] m-4 p-6 rounded-3xl min-h-screen'>
          <p className='text-3xl text-white'>Activity Tracking</p>
          <p className='text-zinc-400'>Tuesday, 26 November</p>
          <div>
            <div>
              <p className="text-xl text-center mb-6 font-bold text-white mt-6">Workout Commits</p>
              <WorkoutBubbleChart />
            </div>
            <div>
              <Calendar />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserHome
