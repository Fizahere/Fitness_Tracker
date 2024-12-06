const Nutriton_Url = {
    NUTRITION_URL: 'https://fitness-tracker-backend-1-vqav.onrender.com/nutrition'
}

const getNutritions = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw { msg: "No token found, please log in again." };
        }

        const response = await axios.get(`${Nutriton_Url.NUTRITION_URL}/get-nutritions`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        if (error.response?.status === 403 || error.response?.status === 401) {
            localStorage.removeItem('token');
            throw { msg: "Session expired, please log in again." };
        }
        throw error.response?.data || { msg: "An unknown error occurred." };
    }
};
const addNutrition = async (payload) => {
    try {
      const response = await axios.post(`${Nutriton_Url.NUTRITION_URL}/add-nutrition`, payload);
      return response;
    } catch (error) {
      throw error.response?.data || { msg: "An unknown error occurred." };
    }
  };
  
export const NutritionServices = {
    getNutritions,
    addNutrition,
}