import React, { useState } from 'react'
import ICONS from '../../assets/constants/icons'
import { useMutation } from 'react-query'
import {WorkoutServices} from '../../services/WorkoutServices'

const WorkoutDataTable = (props) => {
    const { data, loading } = props
    const { mutateAsync: deleteWorkout, isLoading: deleteWorkoutLoading } = useMutation(
        WorkoutServices.deleteWokrout,
        {
            onSuccess:()=>{},
            onError:()=>{}
        }
    )
    const deleteWorkoutHandler=(workoutID)=>{
        try {
            console.log(workoutID,'workout id')
            deleteWorkout(workoutID)
            
        } catch (error) {
            
        }
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-transparent dark:border-[#1b1b1c] border border-gray-200 rounded-lg shadow-md">
                <thead>
                    <tr className="bg-gray-300 text-gray-700 dark:bg-[#1b1b1c] dark:text-zinc-400 text-sm font-semibold">
                        <th className="px-6 py-3 text-left">Exercise Name</th>
                        <th className="px-6 py-3 text-left">Sets</th>
                        <th className="px-6 py-3 text-left">Reps</th>
                        <th className="px-6 py-3 text-left">Weights</th>
                        <th className="px-6 py-3 text-left">Notes</th>
                        <th className="px-6 py-3 text-left">Edit</th>
                        <th className="px-6 py-3 text-left">Delete</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700 dark:text-zinc-400">
                    {data.length >= 1 ? data.map((singleData, index) => (
                        <tr key={index} className="hover:bg-gray-50 border-b dark:hover:bg-[#1b1b1c]">
                            <td className="px-6 py-4">{singleData.title}</td>
                            <td className="px-6 py-4">{singleData.exercises.sets}</td>
                            <td className="px-6 py-4">{singleData.exercises.reps}</td>
                            <td className="px-6 py-4">{singleData.exercises.exerciseName}</td>
                            <td className="px-6 py-4">{singleData.category}</td>
                            <td className="px-6 py-4">
                                <button className="text-white bg-blue-400 px-4 rounded-lg py-2 hover:underline">Edit</button>
                            </td>
                            <td className="px-6 py-4">
                                <button className="text-white bg-red-400 px-4 rounded-lg py-2 hover:underline ml-2"
                                    onClick={deleteWorkoutHandler(singleData._id)}
                                >Delete</button>
                            </td>
                        </tr>
                    )) : !loading && <p className='text-center p-5'>No Data</p>}
                </tbody>
            </table>
            <div className='flex justify-center items-center m-10'>
                {loading &&
                    <i className='flex items-center'>
                        <ICONS.LOADING className='animate-spin text-black dark:text-white text-4xl mr-2' />
                        Loading..
                    </i>
                }
            </div>
        </div>
    )
}

export default WorkoutDataTable
