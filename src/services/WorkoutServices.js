import axios from "axios"

const WorkoutUrl = {
  WORKOUT_URL: `${import.meta.env.VITE_API_URL}/workout`
}

const token = localStorage.getItem('token');

const getAllWorkouts = async () => {
  try {
    const response = await axios.get(`${WorkoutUrl.WORKOUT_URL}/get-all-workouts`)
    return response.data;
  } catch (error) {
    throw error.response?.data || { msg: "An unknown error occurred." };
  }
}
const getWorkouts = async (userId) => {
  try {
    const response = await axios.get(`${WorkoutUrl.WORKOUT_URL}/get-workouts/${userId}`);
    console.log('data',response.data)
    return response;
  } catch (error) {
    console.log('err',error.response.data)
    throw error.response?.data || { msg: "An unknown error occurred." };
  }
};
const getCaloryBurn = async () => {
  try {
    const response = await axios.get(`${WorkoutUrl.WORKOUT_URL}/get-calories`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    return response;
  } catch (error) {
    throw error.response?.data || { msg: "An unknown error occurred." };
  }
}
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
    );
    return response;
  } catch (error) {
    throw error.response?.data || { msg: "An unknown error occurred." };
  }
};
export const editWorkout = async (props) => {
  const [workoutId, payload] = props;
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
const searchWorkout = async (searchQuery) => {
  try {
    const response = await axios.get(`${WorkoutUrl.WORKOUT_URL}/search-workout/${searchQuery}`)
    return response;
  } catch (error) {
    throw error || { msg: "An unknown error occurred." };
  }
}
const searchUserWorkout = async (searchQuery) => {
  try {
    const response = await axios.get(`${WorkoutUrl.WORKOUT_URL}/search-user-workout/${searchQuery}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    return response.data;
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
  getCaloryBurn,
  searchWorkout,
  searchUserWorkout
}