import React from 'react'
import ICONS from '../../assets/constants/icons'

const NutritionDataTable = (props) => {
    const { data, loading } = props

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-transparent dark:border-[#1b1b1c] border border-gray-200 rounded-lg shadow-md">
                <thead>
                    <tr className="bg-gray-300 text-gray-700 dark:bg-[#1b1b1c] dark:text-zinc-400 text-sm font-semibold">
                        <th className="px-6 py-3 text-left">MealType</th>
                        <th className="px-6 py-3 text-left">FoodName</th>
                        <th className="px-6 py-3 text-left">Calories</th>
                        <th className="px-6 py-3 text-left">Protein</th>
                        <th className="px-6 py-3 text-left">Carbs</th>
                        <th className="px-6 py-3 text-left">Fats</th>
                        <th className="px-6 py-3 text-left">Quantity</th>
                        <th className="px-6 py-3 text-left">Edit</th>
                        <th className="px-6 py-3 text-left">Delete</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700 dark:text-zinc-400">
                    {data.length >= 1 ? data.map((singleData, index) => (
                        <tr key={index} className="hover:bg-gray-50 border-b dark:hover:bg-[#1b1b1c]">
                            <td className="px-6 py-4">{singleData.mealType}</td>
                            <td className="px-6 py-4">{singleData.foodItems.foodName}</td>
                            <td className="px-6 py-4">{singleData.foodItems.calories}</td>
                            <td className="px-6 py-4">{singleData.foodItems.protein}</td>
                            <td className="px-6 py-4">{singleData.foodItems.carbs}</td>
                            <td className="px-6 py-4">{singleData.foodItems.fats}</td>
                            <td className="px-6 py-4">{singleData.foodItems.quantity}</td>
                            <td className="px-6 py-4">
                                <button className="text-white bg-blue-400 px-4 rounded-lg py-2 hover:underline">Edit</button>
                            </td>
                            <td className="px-6 py-4">
                                <button className="text-white bg-red-400 px-4 rounded-lg py-2 hover:underline ml-2">Delete</button>
                            </td>
                        </tr>
                    )) : !loading&&<p className='text-center p-5'>No Data</p>}
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

export default NutritionDataTable
