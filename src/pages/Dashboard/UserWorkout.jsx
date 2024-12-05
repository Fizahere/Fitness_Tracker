import React, { useMemo } from 'react'
import DataTable from '../../components/Mists/DataTable'
import { useQuery } from 'react-query'
import { WorkoutServices } from '../../services/WorkoutServices'

const UserWorkout = () => {
  const { data: workoutData,isLoading:workoutLoading } = useQuery('workout-data', WorkoutServices.getWorkouts);

  const workoutMemoData = useMemo(() => {
    return workoutData?.data?.results || [];
  }, [workoutData?.data?.results]);

  return (
    <div>
      <p className='text-3xl font-bold text-black dark:text-white mx-4 mb-6'>Workouts</p>
      <DataTable data={workoutMemoData} loading={workoutLoading} />
    </div>
  )
}

export default UserWorkout
