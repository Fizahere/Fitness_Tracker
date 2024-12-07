import axios from "axios"

const WorkoutUrl = {
  WORKOUT_URL: 'https://fitness-tracker-backend-1-vqav.onrender.com/workout/'
}

const token = localStorage.getItem('token');
const getWorkouts = async () => {
  try {
    if (!token) {
      throw { msg: "No token found, please log in again." };
    }

    const response = await axios.get(`${WorkoutUrl.WORKOUT_URL}/get-workouts`, {
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

const addWorkout = async (payload) => {
  try {
    const response = await axios.post(
      `${WorkoutUrl.WORKOUT_URL}/add-workout`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    throw error.response?.data || { msg: "An unknown error occurred." };
  }
};

export const WorkoutServices = {
  getWorkouts,
  addWorkout,
}