import axios from "axios"

const WorkoutUrl={
    WORKOUT_URL:'https://fitness-tracker-backend-1-vqav.onrender.com/workout/'
}

const getWorkouts = async () => {
    try {
        const response = await axios.get(`${WorkoutUrl.WORKOUT_URL}/get-workouts`)
        return response
    } catch (error) {
        console.log(error)
    }
}

const addWorkout = async (payload) => {
    try {
        console.log("payload", payload)
      const response = await axios.post('https://fitness-tracker-backend-1-vqav.onrender.com/workout/add-workout', payload);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

export const WorkoutServices = {
    getWorkouts,
    addWorkout,
}