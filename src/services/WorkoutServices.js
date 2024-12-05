import axios from "axios"

const getWorkouts=async()=>{
    try {
        const response=await axios.get('https://fitness-tracker-backend-1-vqav.onrender.com/workout/get-workouts')
        console.log(response.data.results,'data')
    } catch (error) {
        
    }
}
getWorkouts()

export const WorkoutServices={
    getWorkouts,
}