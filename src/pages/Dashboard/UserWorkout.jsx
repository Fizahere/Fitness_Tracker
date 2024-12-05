import React from 'react'
import DataTable from '../../components/Mists/DataTable'
import { useQuery } from 'react-query'
import { WorkoutServices } from '../../services/WorkoutServices'

const UserWorkout = () => {
  const { data: workoutData } = useQuery(WorkoutServices.getWorkouts(), 'workout-data')
  console.log(workoutData,'workoutData')
  return (
    <div>
      <p className='text-3xl font-bold text-black dark:text-white mx-4 mb-6'>Workouts</p>
      <DataTable />
    </div>
  )
}

export default UserWorkout
