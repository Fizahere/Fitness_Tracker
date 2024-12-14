import { useMutation, useQuery } from "react-query";
import { WorkoutServices } from "../services/WorkoutServices";
import { useMemo, useState } from "react";
import { AuthServices, getUserIdFromToken } from "../services/authServices";
import userImage from '../assets/images/user.jpg';
import ICONS from "../assets/constants/icons";
import { useNavigate } from "react-router-dom";

const loggedInUserId = getUserIdFromToken(localStorage.getItem('token'));

const ExploreUsers = () => {
    const [isForyou, setIsForyou] = useState('foryou');
    const navigate = useNavigate();
    const [isFollowed, setIsFollowed] = useState(false);

    const { data: allWorkoutsData, isLoading: workoutLoading } = useQuery(
        'all-workout-data',
        WorkoutServices.getAllWorkouts
    );
    const allWorkoutsMemoData = useMemo(
        () => allWorkoutsData?.results || [],
        [allWorkoutsData]
    );

    const { mutateAsync: followUserRequest } = useMutation(AuthServices.followUser, {
        onSuccess: () => {
            queryClient.invalidateQueries('all-workout-data');
            console.log('User followed successfully');
        },
        onError: (error) => {
            if (error.msg === 'You are already following.') {
                setIsFollowed(true);
            }
            console.error(error.msg);
        }
    });

    const followUserHandler = async (userId) => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/create-new-account');
            return;
        }
        await followUserRequest(userId);
    };
    const visitProfile = (userId) => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/create-new-account');
            return;
        }
        navigate('/profile')
    }

    return (
        <div className="min-h-screen bg-white flex flex-col md:flex-row">
            <div className="w-auto md:w-3/4 md:mt-10">
                <div className="flex justify-evenly font-bold">
                    <p
                        className={`text-xl cursor-pointer ${isForyou === 'foryou' ? 'border-b-2' : 'border-none'} border-black p-2`}
                        onClick={() => setIsForyou('foryou')}
                    >
                        For You
                    </p>
                    <p
                        className={`text-xl cursor-pointer ml-4 ${isForyou === 'following' ? 'border-b-2' : 'border-none'} border-black p-2`}
                        onClick={() => setIsForyou('following')}
                    >
                        Following
                    </p>
                </div>
                <div>
                    {isForyou === 'foryou' ?
                        (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                                {allWorkoutsMemoData ? (
                                    allWorkoutsMemoData.map((singleData, index) => (
                                        <div
                                            key={index}
                                            className="bg-[#e5e6e1] rounded-xl p-4 m-4 flex justify-between items-center"
                                        >
                                            <div>
                                                <div className="flex items-center">
                                                    <div className="relative">
                                                        {
                                                            !singleData?.userId?.followers.includes(loggedInUserId) &&
                                                            singleData?.userId?._id !== loggedInUserId && (
                                                                <i
                                                                    className="absolute right-0 bottom-1 text-xl cursor-pointer bg-lime-300 rounded-full"
                                                                >
                                                                    <ICONS.FOLLOW
                                                                        onClick={() => followUserHandler(singleData?.userId?._id)}
                                                                    />
                                                                </i>
                                                            )
                                                        }
                                                        <img
                                                            src={`https://fitness-tracker-backend-1-vqav.onrender.com/${singleData.userId.profileImage}`}
                                                            className="cursor-pointer rounded-full h-14 w-14 border-double border-2 border-[#6a4b5d] p-1"
                                                            alt="profile image"
                                                            onClick={() => visitProfile(singleData?.userId?._id)}
                                                        />
                                                    </div>
                                                    <p className="font-bold text-black ml-2">
                                                        {singleData.userId.username}
                                                    </p>
                                                </div>
                                                <p className="text-lg ml-10">{singleData.exercises.notes}</p>
                                            </div>
                                            <div className="flex flex-col">
                                                <ICONS.LIKE className="text-2xl hover:text-[1.6rem] cursor-pointer" />
                                                <ICONS.LIKED className="text-xl mt-1 hover:text-[1.6rem] cursor-pointer" />
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    workoutLoading ? (
                                        <i className="flex justify-center">
                                            <ICONS.LOADING className="animate-spin text-2xl my-56" />
                                        </i>
                                    ) : (
                                        <p className="my-56 text-zinc-700 flex items-center justify-center">
                                            Check your internet connection
                                        </p>
                                    )
                                )}
                            </div>
                        )
                        : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                                {allWorkoutsMemoData ? (
                                    allWorkoutsMemoData.map((singleData, index) => (
                                        <>
                                            {singleData?.userId?.followers.includes(loggedInUserId) &&
                                                <div
                                                    key={index}
                                                    className="bg-[#e5e6e1] rounded-xl p-4 m-4 flex justify-between items-center"
                                                >
                                                    <div>
                                                        <div className="flex items-center">
                                                            <div className="relative">
                                                                {
                                                                    !singleData?.userId?.followers.includes(loggedInUserId) &&
                                                                    singleData?.userId?._id !== loggedInUserId && (
                                                                        <i
                                                                            className="absolute right-0 bottom-1 text-xl cursor-pointer bg-lime-300 rounded-full"
                                                                        >
                                                                            <ICONS.FOLLOW
                                                                                onClick={() => followUserHandler(singleData?.userId?._id)}
                                                                            />
                                                                        </i>
                                                                    )
                                                                }
                                                                <img
                                                                    src={`https://fitness-tracker-backend-1-vqav.onrender.com/${singleData.userId.profileImage}`}
                                                                    className="cursor-pointer rounded-full h-14 w-14 border-double border-2 border-[#6a4b5d] p-1"
                                                                    alt="profile image"
                                                                    onClick={() => visitProfile(singleData?.userId?._id)}
                                                                />
                                                            </div>
                                                            <p className="font-bold text-black ml-2">
                                                                {singleData.userId.username}
                                                            </p>
                                                        </div>
                                                        <p className="text-lg ml-10">{singleData.exercises.notes}</p>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <ICONS.LIKE className="text-2xl hover:text-[1.6rem] cursor-pointer" />
                                                        <ICONS.LIKED className="text-xl mt-1 hover:text-[1.6rem] cursor-pointer" />
                                                    </div>
                                                </div>
                                            }
                                        </>
                                    ))
                                ) : (
                                    workoutLoading ? (
                                        <i className="flex justify-center">
                                            <ICONS.LOADING className="animate-spin text-2xl my-56" />
                                        </i>
                                    ) : (
                                        <p className="my-56 text-zinc-700 flex items-center justify-center">
                                            Check your internet connection
                                        </p>
                                    )
                                )}
                            </div>
                        )
                    }
                </div>
            </div>
            <div className="w-auto md:w-1/4 md:mt-14">
                <h3 className="text-2xl font-bold ml-4">Explore Users</h3>
                {[...Array(4)].map((_, index) => (
                    <div
                        key={index}
                        className="bg-[#e5e6e1] rounded-xl p-4 m-4 flex justify-between items-center"
                    >
                        <div>
                            <div className="flex items-center">
                                <img
                                    src={userImage}
                                    className="rounded-full h-14 w-14 border-double border-2 border-[#6a4b5d] p-1"
                                    alt="profile image"
                                />
                                <p className="font-bold text-black ml-2">Fiza -</p>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <button className="border-2 border-black bg-lime-300 px-3 py-1 rounded-lg">
                                Follow
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default ExploreUsers;


// import { useMutation, useQuery } from "react-query";
// import { WorkoutServices } from "../services/WorkoutServices";
// import { useMemo, useState } from "react";
// import { AuthServices, getUserIdFromToken } from "../services/authServices";
// import userImage from '../assets/images/user.jpg';
// import ICONS from "../assets/constants/icons";
// import { useNavigate } from "react-router-dom";

// const loggedInUserId = getUserIdFromToken(localStorage.getItem('token'));

// const ExploreUsers = () => {
//     const [isForyou, setIsForyou] = useState('foryou');
//     const navigate = useNavigate();
//     const [isFollowed, setIsFollowed] = useState(false);

//     const { data: allWorkoutsData, isLoading: workoutLoading } = useQuery(
//         'all-workout-data',
//         WorkoutServices.getAllWorkouts
//     );
//     const allWorkoutsMemoData = useMemo(
//         () => allWorkoutsData?.results,
//         [allWorkoutsData?.results]
//     );

//     const { mutateAsync: followUserRequest } = useMutation(AuthServices.followUser, {
//         onSuccess: () => {
//             queryClient.invalidateQueries('all-workout-data');
//             console.log('User followed successfully');
//         },
//         onError: (error) => {
//             if (error.msg === 'You are already following.') {
//                 setIsFollowed(true);
//             }
//             console.error(error.msg);
//         }
//     });

//     const followUserHandler = async (userId) => {
//         const token = localStorage.getItem('token');
//         if (!token) {
//             navigate('/create-new-account');
//             return;
//         }
//         await followUserRequest(userId);
//     };
//     const visitProfile = (userId) => {
//         const token = localStorage.getItem('token');
//         if (!token) {
//             navigate('/create-new-account');
//             return;
//         }
//         navigate('/profile')
//     }

//     return (
//         <div className="min-h-screen bg-white flex flex-col md:flex-row">
//             <div className="w-auto md:w-3/4 md:mt-10">
//                 <div className="flex justify-center font-bold">
//                     <p
//                         className={`text-xl cursor-pointer ${isForyou === 'foryou' ? 'border-b-2' : 'border-none'} border-black p-2`}
//                         onClick={() => setIsForyou('foryou')}
//                     >
//                         For You
//                     </p>
//                     <p
//                         className={`text-xl cursor-pointer ml-4 ${isForyou === 'following' ? 'border-b-2' : 'border-none'} border-black p-2`}
//                         onClick={() => setIsForyou('following')}
//                     >
//                         Following
//                     </p>
//                 </div>
//                 <div>
//                     {isForyou === 'foryou' ?
//                         (
//                             <div>
//                                 {allWorkoutsMemoData ? (
//                                     allWorkoutsMemoData.map((singleData, index) => (
//                                         <div
//                                             key={index}
//                                             className="bg-[#e5e6e1] rounded-xl p-4 m-4 flex justify-between items-center"
//                                         >
//                                             <div>
//                                                 <div className="flex items-center">
//                                                     <div className="relative">
//                                                         {
//                                                             !singleData?.userId?.followers.includes(loggedInUserId) &&
//                                                             singleData?.userId?._id !== loggedInUserId && (
//                                                                 <i
//                                                                     className="absolute right-0 bottom-1 text-xl cursor-pointer bg-lime-300 rounded-full"
//                                                                 >
//                                                                     <ICONS.FOLLOW
//                                                                         onClick={() => followUserHandler(singleData?.userId?._id)}
//                                                                     />
//                                                                 </i>
//                                                             )
//                                                         }
//                                                         <img
//                                                             src={`https://fitness-tracker-backend-1-vqav.onrender.com/${singleData.userId.profileImage}`}
//                                                             className="cursor-pointer rounded-full h-14 w-14 border-double border-2 border-[#6a4b5d] p-1"
//                                                             alt="profile image"
//                                                             onClick={() => visitProfile(singleData?.userId?._id)}
//                                                         />
//                                                     </div>
//                                                     <p className="font-bold text-black ml-2">
//                                                         {singleData.userId.username}
//                                                     </p>
//                                                 </div>
//                                                 <p className="text-lg ml-10">{singleData.exercises.notes}</p>
//                                             </div>
//                                             <div className="flex flex-col">
//                                                 <ICONS.LIKE className="text-2xl hover:text-[1.6rem] cursor-pointer" />
//                                                 <ICONS.LIKED className="text-xl mt-1 hover:text-[1.6rem] cursor-pointer" />
//                                             </div>
//                                         </div>
//                                     ))
//                                 ) : (
//                                     workoutLoading ? (
//                                         <i className="flex justify-center">
//                                             <ICONS.LOADING className="animate-spin text-2xl my-56" />
//                                         </i>
//                                     ) : (
//                                         <p className="my-56 text-zinc-700 flex items-center justify-center">
//                                             Check your internet connection
//                                         </p>
//                                     )
//                                 )}
//                             </div>
//                         )
//                         : (
//                             <div>following</div>
//                         )
//                     }
//                 </div>
//             </div>
//             <div className="w-auto md:w-1/4 md:mt-14">
//                 <h3 className="text-2xl font-bold ml-4">Explore Users</h3>
//                 {[...Array(4)].map((_, index) => (
//                     <div
//                         key={index}
//                         className="bg-[#e5e6e1] rounded-xl p-4 m-4 flex justify-between items-center"
//                     >
//                         <div>
//                             <div className="flex items-center">
//                                 <img
//                                     src={userImage}
//                                     className="rounded-full h-14 w-14 border-double border-2 border-[#6a4b5d] p-1"
//                                     alt="profile image"
//                                 />
//                                 <p className="font-bold text-black ml-2">Fiza -</p>
//                             </div>
//                         </div>
//                         <div className="flex flex-col">
//                             <button className="border-2 border-black bg-lime-300 px-3 py-1 rounded-lg">
//                                 Follow
//                             </button>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };
// export default ExploreUsers;
