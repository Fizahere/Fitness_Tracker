import React, { useState } from 'react';
import ICONS from '../../assets/constants/icons';

const WorkoutDataTable = ({
    data,
    workoutLoading,
    deleteLoading,
    onDelete,
    onEdit,
}) => {
    const [deletingWorkoutId, setDeletingWorkoutId] = useState(null);

    const deleteWorkoutHandler = async (workoutID) => {
        try {
            setDeletingWorkoutId(workoutID);
            await onDelete(workoutID);
        } catch (error) {
            console.error('Error deleting workout:', error);
        } finally {
            setDeletingWorkoutId(null);
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-transparent dark:border-[#1b1b1c] border border-gray-200 rounded-lg shadow-md">
                <thead>
                    <tr className="bg-gray-300 text-gray-700 dark:bg-[#1b1b1c] dark:text-zinc-400 text-sm font-semibold">
                        <th className="px-6 py-3 text-left">S.no</th>
                        <th className="px-6 py-3 text-left">Exercise Name</th>
                        <th className="px-6 py-3 text-left">Sets</th>
                        <th className="px-6 py-3 text-left">Reps</th>
                        <th className="px-6 py-3 text-left">Weights</th>
                        <th className="px-6 py-3 text-left">Notes</th>
                        <th className="px-6 py-3 text-left">Category</th>
                        <th className="px-6 py-3 text-left">Edit</th>
                        <th className="px-6 py-3 text-left">Delete</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700 dark:text-zinc-400">
                    {data.length >= 1 ? (
                        data.map((singleData,index) => (
                            <tr
                                key={singleData._id}
                                className="hover:bg-gray-50 border-b dark:hover:bg-[#1b1b1c]"
                            >
                                <td className="px-6 py-4">{index+1}</td>
                                <td className="px-6 py-4">
                                    <p className='text-black w-32'>{singleData.title}</p>
                                    <p>{singleData.exercises.exerciseName}</p>
                                </td>
                                <td className="px-6 py-4">{singleData.exercises.sets}</td>
                                <td className="px-6 py-4">{singleData.exercises.reps}</td>
                                <td className="px-6 py-4">{singleData.exercises.weight}</td>
                                <td className="px-6 py-4"><p className="w-32">{singleData.exercises.notes}</p></td>
                                <td className="px-6 py-4">{singleData.category}</td>
                                <td className="px-6 py-4">
                                    <button className="text-white bg-blue-400 px-4 rounded-lg py-2"
                                        onClick={() => onEdit(singleData._id)}
                                    >
                                        Edit
                                    </button>
                                </td>
                                <td className="px-6 py-4">
                                    <button
                                        className="text-white bg-red-400 px-4 rounded-lg py-2 w-20 ml-2"
                                        onClick={() => deleteWorkoutHandler(singleData._id)}
                                    >
                                        {deleteLoading && deletingWorkoutId === singleData._id ? (
                                            <i className="flex items-center justify-center">
                                                <ICONS.LOADING className="animate-spin text-white dark:text-black text-sm mr-2" />
                                            </i>
                                        ) : (
                                            <p className="text-sm">Delete</p>
                                        )}
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : !workoutLoading ? (
                        <p className="text-center p-5">No Data</p>
                    ) : null}
                </tbody>
            </table>
            <div className="flex justify-center items-center m-10">
                {workoutLoading && (
                    <i className="flex items-center">
                        <ICONS.LOADING className="animate-spin text-black dark:text-white text-4xl mr-2" />
                        Loading...
                    </i>
                )}
            </div>
        </div>
    );
};

export default WorkoutDataTable;
