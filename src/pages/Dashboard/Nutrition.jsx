import React, { useMemo, useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import ICONS from '../../assets/constants/icons';
import NutritionDataTable from '../../components/Mists/NutritionDataTable';
import { NutritionServices } from '../../services/nutritionServices';
import { getUserIdFromToken } from '../../services/authServices';

const Nutrition = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [dataToEdit, setDataToEdit] = useState(null);
  const userId = getUserIdFromToken();

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

  useEffect(() => {
    if (isEdit && dataToEdit) {
      setMealType(dataToEdit.mealType || '');
      setFoodItems(dataToEdit.foodItems || {
        foodName: '',
        quantity: '',
        calories: '',
        protein: '',
        carbs: '',
        fats: '',
      });
    }
  }, [isEdit, dataToEdit]);

  const { data: nutritionData, isLoading: nutritionLoading } = useQuery(
    'nutrition-data',
    NutritionServices.getNutritions
  );

  const nutritionMemoData = useMemo(
    () => nutritionData?.data?.results || [],
    [nutritionData]
  );

  const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack'];

  const { mutateAsync: deleteNutrition, isLoading: deleteLoading } = useMutation(
    NutritionServices.deleteNutrition,
    {
      onSuccess: () => queryClient.invalidateQueries('nutrition-data'),
      onError: (error) => console.error('Error deleting nutrition:', error),
    }
  );

  const { mutateAsync: saveNutrition, isLoading: isSavingNutrition } = useMutation(
    isEdit ? NutritionServices.editNutritions : NutritionServices.addNutrition,
    {
      onSuccess: () => {
        resetForm();
        queryClient.invalidateQueries('nutrition-data');
        setDrawerOpen(false);
      },
      onError: (err) => console.error('Error saving nutrition:', err),
    }
  );

  const { mutate: fetchNutritionById } = useMutation(
    NutritionServices.getNutritionById,
    {
      onSuccess: (data) => {
        setDataToEdit(data?.results);
        setIsEdit(true);
        setDrawerOpen(true);
      },
    }
  );

  const resetForm = () => {
    setMealType('');
    setFoodItems({
      foodName: '',
      quantity: '',
      calories: '',
      protein: '',
      carbs: '',
      fats: '',
    });
    setIsEdit(false);
    setDataToEdit(null);
  };

  const toggleDrawer = (open) => {
    if (!open) resetForm();
    setDrawerOpen(open);
  };

  const handleSaveWorkout = async (e) => {
    e.preventDefault();
    const nutritionPayload = {
      userId,
      mealType,
      foodItems,
    };

    try {
      await saveNutrition(
        isEdit ? [dataToEdit._id, nutritionPayload] : nutritionPayload
      );
      console.log(
        `${isEdit ? 'Nutrition updated' : 'Nutrition created'} successfully!`
      );
    } catch (err) {
      console.error(
        `Error ${isEdit ? 'updating' : 'creating'} nutrition:`,
        err
      );
    }
  };

  return (
    <div>
      <div className="flex justify-between mb-4 items-center">
        <p className="text-3xl font-bold text-black dark:text-white mx-4 mb-6">
          Nutritions
        </p>
        <button
          className="text-white bg-[#262135] dark:text-black dark:bg-white px-5 py-3 text-md rounded-lg"
          onClick={() => toggleDrawer(true)}
        >
          Add Nutrition
        </button>
      </div>

      <NutritionDataTable
        data={nutritionMemoData}
        isLoading={nutritionLoading}
        deleteLoading={deleteLoading}
        onDelete={deleteNutrition}
        onEdit={(id) => fetchNutritionById(id)}
      />

      {drawerOpen && (
        <div
          className="fixed inset-0 bg-[#1b1b1c] bg-opacity-50 z-50"
          onClick={() => toggleDrawer(false)}
        >
          <div
            className="fixed right-0 top-0 w-[30rem] h-full bg-white dark:bg-black shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-xl font-semibold text-black dark:text-white">
                  {isEdit ? 'Edit Nutrition' : 'Add New Nutrition'}
                </h2>
                <i
                  className="cursor-pointer"
                  onClick={() => toggleDrawer(false)}
                >
                  <ICONS.CLOSE fontSize={20} />
                </i>
              </div>
              <form onSubmit={handleSaveWorkout}>
                <div className="flex">
                  <div>
                    <label className="block text-sm font-medium text-black dark:text-white">
                      Food Name
                    </label>
                    <input
                      type="text"
                      name="foodName"
                      value={foodItems.foodName}
                      onChange={(e) =>
                        setFoodItems({ ...foodItems, foodName: e.target.value })
                      }
                      className="w-52 p-2 border rounded-lg"
                      required
                    />
                  </div>
                  <div className="relative inline-block w-52 ml-2">
                    <label className="block text-sm font-medium">
                      Meal Type
                    </label>
                    <select
                      name="mealType"
                      value={mealType}
                      onChange={(e) => setMealType(e.target.value)}
                      className="w-full px-4 py-2 border rounded-md"
                      required
                    >
                      <option value="" disabled>
                        Select meal type
                      </option>
                      {mealTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {['quantity', 'calories', 'protein', 'carbs', 'fats'].map(
                  (field) => (
                    <div key={field}>
                      <label className="block text-sm font-medium mt-2">
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </label>
                      <input
                        type="text"
                        name={field}
                        value={foodItems[field]}
                        onChange={(e) =>
                          setFoodItems({
                            ...foodItems,
                            [field]: e.target.value,
                          })
                        }
                        className="w-full p-2 border rounded-lg"
                        required
                      />
                    </div>
                  )
                )}

                <div className="mt-4">
                  <button
                    type="submit"
                    className="px-4 py-3 rounded-lg bg-[#262135] text-white w-full"
                    disabled={isSavingNutrition}
                  >
                    {isSavingNutrition ? 'Saving...' : 'Save Nutrition'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Nutrition;
