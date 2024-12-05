import React from 'react'

const DataTable = (props) => {
    const { data, loading } = props
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-black dark:border-[#1b1b1c] border border-gray-200 rounded-lg shadow-md">
                <thead>
                    <tr className="bg-gray-100 text-gray-700 dark:bg-[#1b1b1c] dark:text-zinc-400 text-sm font-semibold">
                        <th className="px-6 py-3 text-left">Exercise Name</th>
                        <th className="px-6 py-3 text-left">Sets</th>
                        <th className="px-6 py-3 text-left">Reps</th>
                        <th className="px-6 py-3 text-left">Weights</th>
                        <th className="px-6 py-3 text-left">Notes</th>
                        <th className="px-6 py-3 text-left">Action</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700 dark:text-zinc-400">
                    {data && data.map((singleData, index) => (
                        <tr key={index} className="hover:bg-gray-50 border-b dark:hover:bg-[#1b1b1c]">
                            <td className="px-6 py-4">{singleData.title}</td>
                            <td className="px-6 py-4">{singleData.exercises.sets}</td>
                            <td className="px-6 py-4">{singleData.exercises.reps}</td>
                            <td className="px-6 py-4">{singleData.exercises.exerciseName}</td>
                            <td className="px-6 py-4">{singleData.category}</td>
                            <td className="px-6 py-4">
                                <button className="text-white bg-blue-400 px-4 rounded-lg py-2 hover:underline">Edit</button>
                                <button className="text-white bg-red-400 px-4 rounded-lg py-2 hover:underline ml-2">Delete</button>
                            </td>
                        </tr>
                    ))}
                    {loading && <p className='text-white text-center p-4'>Loading...</p>}
                </tbody>
            </table>
        </div>
    )
}

export default DataTable
