import axios from "axios"

const getWorkouts = async () => {
    try {
        const response = await axios.get('https://fitness-tracker-backend-1-vqav.onrender.com/workout/get-workouts')
        return response
    } catch (error) {
        console.log(error)
    }
}
getWorkouts()

export const WorkoutServices = {
    getWorkouts,
}