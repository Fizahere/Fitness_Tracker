import { useQuery } from "react-query";
import { WorkoutServices } from "../services/WorkoutServices";
import { useMemo } from "react";

const ExploreUsers = () => {
    const {
        data: allWorkoutsData,
        isLoading: workoutLoading
    } =
        useQuery(
            'all-workout-data',
            WorkoutServices.getAllWorkouts
        )
    const allWorkoutsMemoData = useMemo(
        () => allWorkoutsData?.results,
        [allWorkoutsData?.results]
    )
    console.log(allWorkoutsMemoData,'allWorkoutsMemoData')
    return (
        <>
            <div className="min-h-screen bg-white">
                <h3 className="text-3xl font-bold p-4">Explore Other Users</h3>
                {allWorkoutsMemoData?.map((singleData, index) => (
                    <div key={index} className="bg-[#e5e6e1] rounded-xl p-4 m-4 flex justify-between items-center">
                        <div>
                            <div className="flex items-center">
                                <img src={`https://fitness-tracker-backend-1-vqav.onrender.com/${singleData.userId.profileImage}`} className="rounded-full h-14 w-14 border-double border-2 border-[#6a4b5d] p-1" alt="profile image" />
                                <p className="font-bold text-black ml-2">{singleData.userId.username}</p>
                            </div>
                            <p className="text-lg ml-10">{singleData.exercises.notes}</p>
                        </div>
                        <div className="flex flex-col">
                            <button className="bg-lime-300 text-black px-3 py-2 rounded-xl">Follow</button>
                            <button className="bg-[#262135] text-white px-3 py-2 rounded-xl mt-2">View Profile</button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
export default ExploreUsers;