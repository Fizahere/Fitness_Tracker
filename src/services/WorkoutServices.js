import axios from "axios"

const WorkoutUrl = {
  WORKOUT_URL: 'https://fitness-tracker-backend-1-vqav.onrender.com/workout',
}

const token = localStorage.getItem('token');

const getAllWorkouts=async()=>{
  try {
    const response=await axios.get(`${WorkoutUrl.WORKOUT_URL}/get-all-workouts`)
    return response.data;
  } catch (error) {
    throw error.response?.data || { msg: "An unknown error occurred." };
  }
}
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

const getWorkoutById = async (workoutId) => {
  try {
    const response = await axios.get(`${WorkoutUrl.WORKOUT_URL}/get-workout/${workoutId}`);
    return response.data;
  } catch (error) {
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
export const editWorkout = async (props) => {
  const [workoutId, payload]=props;
  try {
    const response = await axios.put(
      `${WorkoutUrl.WORKOUT_URL}/update-workout/${workoutId}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    throw error || { msg: "An unknown error occurred." };

  }
}
const deleteWorkout = async (userId) => {
  try {
    const response = await axios.delete(`${WorkoutUrl.WORKOUT_URL}/delete-workout/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response;
  } catch (error) {
    throw error || { msg: "An unknown error occurred." };

  }
}
export const WorkoutServices = {
  getAllWorkouts,
  getWorkouts,
  getWorkoutById,
  addWorkout,
  editWorkout,
  deleteWorkout,
}