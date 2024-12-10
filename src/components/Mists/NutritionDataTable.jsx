import React, { useState } from 'react'
import ICONS from '../../assets/constants/icons'

const NutritionDataTable = ({
    data,
    isLoading,
    deleteLoading,
    onDelete,
    onEdit,
}) => {
    const [deletingNutritionId, setDeletingNutritionId] = useState(null);

    const deleteNutritionHandler = async (nutritionID) => {
        try {
            setDeletingNutritionId(nutritionID);
            await onDelete(nutritionID);
        } catch (error) {
            console.error('Error deleting Nutrition:', error);
        } finally {
            setDeletingNutritionId(null);
        }
    };
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-transparent dark:border-[#1b1b1c] border border-gray-200 rounded-lg shadow-md">
                <thead>
                    <tr className="bg-gray-300 text-gray-700 dark:bg-[#1b1b1c] dark:text-zinc-400 text-sm font-semibold">
                        {['S.no', 'MealType', 'FoodName', 'Calories', 'Protein', 'Carbs', 'Quantity','Fats', 'Edit', 'Delete'].map((headerName) => (
                            <th className="px-2 md:px-8 py-3 text-left">{headerName}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className="text-gray-700 dark:text-zinc-400">
                    {data.length >= 1 ? data.map((singleData, index) => (
                        <tr key={index} className="hover:bg-gray-50 border-b dark:hover:bg-[#1b1b1c]">
                            <td className="px-2 md:px-8 py-4">{index+1}.</td>
                            <td className="px-2 md:px-8 py-4">{singleData.mealType}</td>
                            <td className="px-2 md:px-8 py-4">{singleData.foodItems.foodName}</td>
                            <td className="px-2 md:px-8 py-4">{singleData.foodItems.calories}</td>
                            <td className="px-2 md:px-8 py-4">{singleData.foodItems.protein}</td>
                            <td className="px-2 md:px-8 py-4">{singleData.foodItems.carbs}</td>
                            <td className="px-2 md:px-8 py-4">{singleData.foodItems.fats}</td>
                            <td className="px-2 md:px-8 py-4">{singleData.foodItems.quantity}</td>
                            <td className="px-2 md:px-8 py-4">
                                <button className="text-white bg-blue-400 px-2 md:px-8 rounded-lg py-2"
                                    onClick={() => onEdit(singleData._id)}
                                >
                                    Edit
                                </button>
                            </td>
                            <td className="px-2 md:px-8 py-4">
                                <button
                                    className="text-white bg-red-400 px-4 rounded-lg py-2 w-20 ml-2"
                                    onClick={() => deleteNutritionHandler(singleData._id)}
                                >
                                    {deleteLoading && deletingNutritionId === singleData._id ? (
                                        <i className="flex items-center justify-center">
                                            <ICONS.LOADING className="animate-spin text-white dark:text-black text-sm mr-2" />
                                        </i>
                                    ) : (
                                        <p className="text-sm">Delete</p>
                                    )}
                                </button>
                            </td>
                        </tr>
                    )) : !isLoading && <p className='text-center p-5'>No Data</p>}
                </tbody>
            </table>
            <div className='flex justify-center items-center m-10'>
                {isLoading &&
                    <i className='flex items-center text-black dark:text-white'>
                        <ICONS.LOADING className='animate-spin text-4xl mr-2' />
                        Loading..
                    </i>
                }
            </div>
        </div>
    )
}

export default NutritionDataTable
