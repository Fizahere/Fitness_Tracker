import React from 'react'

const DataTable = () => {
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
                    <tr className="hover:bg-gray-50 border-b dark:hover:bg-[#1b1b1c]">
                        <td className="px-6 py-4">Pushups</td>
                        <td className="px-6 py-4">4</td>
                        <td className="px-6 py-4">15</td>
                        <td className="px-6 py-4">..</td>
                        <td className="px-6 py-4">..</td>
                        <td className="px-6 py-4">
                            <button className="text-white bg-blue-400 px-4 rounded-lg py-2 hover:underline">Edit</button>
                            <button className="text-white bg-red-400 px-4 rounded-lg py-2 hover:underline ml-2">Delete</button>
                        </td>
                    </tr>
                    <tr className="hover:bg-gray-50 border-b bg-gray-50 dark:bg-black dark:hover:bg-[#1b1b1c]">
                        <td className="px-6 py-4">Squats</td>
                        <td className="px-6 py-4">3</td>
                        <td className="px-6 py-4">15</td>
                        <td className="px-6 py-4">..</td>
                        <td className="px-6 py-4">..</td>
                        <td className="px-6 py-4">
                            <button className="text-white bg-blue-400 px-4 rounded-lg py-2 hover:underline">Edit</button>
                            <button className="text-white bg-red-400 px-4 rounded-lg py-2 hover:underline ml-2">Delete</button>
                        </td>
                    </tr>
                    <tr className="hover:bg-gray-50 border-b dark:hover:bg-[#1b1b1c]">
                        <td className="px-6 py-4">Pushups</td>
                        <td className="px-6 py-4">4</td>
                        <td className="px-6 py-4">15</td>
                        <td className="px-6 py-4">..</td>
                        <td className="px-6 py-4">..</td>
                        <td className="px-6 py-4">
                            <button className="text-white bg-blue-400 px-4 rounded-lg py-2 hover:underline">Edit</button>
                            <button className="text-white bg-red-400 px-4 rounded-lg py-2 hover:underline ml-2">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default DataTable
