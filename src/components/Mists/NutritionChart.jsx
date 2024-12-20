import React from "react";
import { Doughnut } from "react-chartjs-2";
import { useQuery } from "react-query";
import { NutritionServices } from "../../services/nutritionServices";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ICONS from "../../assets/constants/icons";

ChartJS.register(ArcElement, Tooltip, Legend);

const NutritionChart = () => {
  const { data, isLoading, isError, error, refetch } = useQuery(
    "nutritionData", 
    NutritionServices.NutritionChart 
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
<ICONS.LOADING className="animate-spin text-black text-3xl"/>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center mt-4">
        <p className="text-red-500 mb-2">Error: {error.message}</p>
        <button
          className="px-4 py-2 bg-[#262135] text-white rounded hover:bg-[#262135e3]"
          onClick={refetch}
        >
          Retry
        </button>
      </div>
    );
  }

  const aggregateMacronutrients = (data) =>
    data.reduce(
      (totals, item) => {
        const foodItems = item.foodItems;
        if (foodItems) {
          totals.carbs += parseFloat(foodItems.carbs) || 0;
          totals.protein += parseFloat(foodItems.protein) || 0;
          totals.fats += parseFloat(foodItems.fats) || 0;
        }
        return totals;
      },
      { carbs: 0, protein: 0, fats: 0 }
    );

  const macronutrients = aggregateMacronutrients(data);

  const chartData = {
    labels: ["Carbs", "Protein", "Fats"],
    datasets: [
      {
        data: [macronutrients.carbs, macronutrients.protein, macronutrients.fats],
        backgroundColor: ["#cdbfe7", "#6a4b5d", "#f7f6b4"],
        hoverBackgroundColor: ["#b9a3df", "#5a3f4f", "#f1f09d"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="max-w-[300px] mx-auto">
      <Doughnut data={chartData} />
    </div>
  );
};

export default NutritionChart;
