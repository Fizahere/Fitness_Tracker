import React, { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import ICONS from '../../assets/constants/icons';
import { jwtDecode } from 'jwt-decode';
import NutritionDataTable from '../../components/Mists/NutritionDataTable';
import { NutritionServices } from '../../services/nutritionServices';

const Nutrition = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [foodItems, setFoodItems] = useState({
    foodName: '',
    quantity: '',
    calories: '',
    protein: '',
    carbs: '',
    fats: '',
  });
  const [mealType, setMealType] = useState('');
  const queryClient = useQueryClient();

  const { data: nutritionData, isLoading: nutrtionLoading } = useQuery(
    'nutrtion-data',
    NutritionServices.getNutritions
  );

  const nutrtionMemoData = useMemo(() => nutritionData?.data?.results || [], [nutritionData]);
  const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack'];

  const toggleDrawer = (open) => {
    setDrawerOpen(open);
  };

  const {
    mutateAsync: createNutritionRequest,
    isLoading: isCreatingNutrition,
  } = useMutation(NutritionServices.addNutrition, {
    onSuccess: () => {
      setFoodItems({
        foodName: '',
        quantity: '',
        calories: '',
        protein: '',
        carbs: '',
        fats: '',
      });
      setMealType('');
      toggleDrawer(false);

      queryClient.invalidateQueries('nutrtion-data');
    },
    onError: (err) => {
      console.error('Error creating nutrtion:', err);
    },
  });

  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.user.id;

  const addNutrtionHandler = async (e) => {
    e.preventDefault();
    const nutrtionData = {
      userId,
      mealType,
      foodItems,
    };
    console.log(nutrtionData,'nutrtionData')
    try {
      await createNutritionRequest(nutrtionData);
      console.log('nutrtion created:', nutrtionData);
    } catch (err) {
      console.error('Error creating nutrtion:', err);
    }
  };

  return (
    <div>
      <div className="flex justify-between mb-4 items-center">
        <p className="text-3xl font-bold text-black dark:text-white mx-4 mb-6">Nutrtions</p>
        <button
          className="text-white bg-black dark:text-black dark:bg-white px-5 py-3 text-md rounded-lg"
          onClick={() => toggleDrawer(true)}
        >
          Add Nutrtion
        </button>
      </div>

      <NutritionDataTable data={nutrtionMemoData} loading={nutrtionLoading} />

      <div
        className={`fixed inset-0 bg-[#1b1b1c] bg-opacity-50 z-50 transition-opacity duration-300 ${drawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => toggleDrawer(false)}
      >
        <div
          className={`fixed right-0 top-0 w-[30rem] h-full bg-white dark:bg-black shadow-xl transform transition-transform duration-300 ${drawerOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-xl font-semibold text-black dark:text-white">Add New Nutrtion</h2>
              <i className='cursor-pointer' onClick={() => toggleDrawer(false)}><ICONS.CLOSE fontSize={20} /></i>
            </div>
            <form onSubmit={addNutrtionHandler}>
              <div className="flex">
              <div>
                <label className="block text-sm font-medium text-black dark:text-white">Food Name</label>
                <input
                  type="text"
                  name="foodName"
                  value={foodItems.foodName}
                  onChange={(e) => setFoodItems({ ...foodItems, foodName: e.target.value })}
                  className="w-52 p-2 border rounded-lg bg-white text-black dark:bg-[#1b1b1c] dark:text-white"
                  required
                />
              </div>
                <div className="relative inline-block w-52 ml-2">
                  <label className="block text-sm font-medium text-black dark:text-white">Mealtype</label>
                  <select
                    className="block w-full px-4 py-2 text-sm text-black dark:text-white bg-white text-black dark:bg-[#1b1b1c] dark:text-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    name="mealType"
                    value={mealType}
                    onChange={(e) => setMealType(e.target.value)}
                    required
                  >
                    <option value="" disabled>Select mealtype</option>
                    {mealTypes.map((singleMeal, index) => (
                      <option key={index} value={singleMeal}>
                        {singleMeal}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
             
              <div className="flex mt-4">
                <div>
                  <label className="block text-sm font-medium text-black dark:text-white">Quantity</label>
                  <input
                    type="text"
                    name="quantity"
                    value={foodItems.quantity}
                    onChange={(e) => setFoodItems({ ...foodItems, quantity: e.target.value })}
                    className="w-52 p-2 border rounded-lg bg-white text-black dark:bg-[#1b1b1c] dark:text-white"
                    required
                  />
                </div>
                <div className="ml-2">
                  <label className="block text-sm font-medium text-black dark:text-white">Calories</label>
                  <input
                    type="text"
                    name="calories"
                    value={foodItems.calories}
                    onChange={(e) => setFoodItems({ ...foodItems, calories: e.target.value })}
                    className="w-52 p-2 border rounded-lg bg-white text-black dark:bg-[#1b1b1c] dark:text-white"
                    required
                  />
                </div>
              </div>
             <div className="flex">
             <div className="mt-4">
                <label className="block text-sm font-medium text-black dark:text-white">Protein</label>
                <input
                  type="text"
                  name="protein"
                  value={foodItems.protein}
                  onChange={(e) => setFoodItems({ ...foodItems, protein: e.target.value })}
                  className="w-52 p-2 border rounded-lg bg-white text-black dark:bg-[#1b1b1c] dark:text-white"
                />
              </div>
              <div className="mt-4 ml-2">
                <label className="block text-sm font-medium text-black dark:text-white">Fats</label>
                <input
                  type="text"
                  name="fats"
                  value={foodItems.fats}
                  onChange={(e) => setFoodItems({ ...foodItems, fats: e.target.value })}
                  className="w-52 p-2 border rounded-lg bg-white text-black dark:bg-[#1b1b1c] dark:text-white"
                />
              </div>
             </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-black dark:text-white">Carbs</label>
                <textarea
                  name="carbs"
                  value={foodItems.carbs}
                  onChange={(e) => setFoodItems({ ...foodItems, carbs: e.target.value })}
                  className="w-full p-2 border rounded-lg bg-white text-black dark:bg-[#1b1b1c] dark:text-white"
                />
              </div>

              <div className="mt-4">
                <button
                  type="submit"
                  className="bg-black text-white dark:bg-white dark:text-black px-4 py-3 rounded-lg w-full"
                  disabled={isCreatingNutrition}
                >
                  {isCreatingNutrition ? <div className='flex justify-center items-center'><ICONS.LOADING className='animate-spin text-white text-xl mr-2' /> Loading..</div> : 'Save Workout'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nutrition;
