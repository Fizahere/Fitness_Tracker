import React from 'react'
import DataTable from '../../components/Mists/DataTable'

const UserWorkout = () => {
  return (
    <div>
      <p className='text-3xl font-bold text-black dark:text-white mx-4 mb-6'>Workouts</p>
      <DataTable />
    </div>
  )
}

export default UserWorkout
