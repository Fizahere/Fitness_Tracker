import axios from "axios";

const Nutriton_Url = {
    NUTRITION_URL: 'https://fitness-tracker-backend-1-vqav.onrender.com/nutrition'
}
const token = localStorage.getItem('token');

const getNutritions = async () => {
  try {
    if (!token) {
      throw { msg: "No token found, please log in again." };
    }

    const response = await axios.get(`${Nutriton_Url.NUTRITION_URL}/get-nutritions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response,'response');
    return response;
  } catch (error) {
    if (error.response?.status === 403 || error.response?.status === 401) {
      localStorage.removeItem('token');
      throw { msg: "Session expired, please log in again." };
    }
    throw error.response?.data || { msg: "An unknown error occurred." };
  }
}

  const addNutrition = async (payload) => {
    try {
      const response = await axios.post(
        `${Nutriton_Url.NUTRITION_URL}/add-nutrition`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data; 
    } catch (error) {
      throw error.response?.data || { msg: "An unknown error occurred." };
    }
  };
  
export const NutritionServices = {
    getNutritions,
    addNutrition,
}