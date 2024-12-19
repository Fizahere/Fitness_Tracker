import React, { useMemo, useState, useEffect } from 'react';
import bgImage from '../assets/images/mainImage.jpg';
import ICONS from '../assets/constants/icons';
import { UserServices } from '../services/userServices';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { AuthServices, getUserIdFromToken } from '../services/authServices';
import { WorkoutServices } from '../services/WorkoutServices';
import image from '../assets/images/victoria.jpg'
import { useParams } from 'react-router-dom';
import { PostServices } from '../services/postServices';
import PostCard from '../components/Mists/PostCard';

const Profile = () => {
    const { id: userId } = useParams();
    const queryClient = useQueryClient();
    const loggedInUserId = getUserIdFromToken();
    const token = localStorage.getItem('token');
    const [isTab, setIsTab] = useState('posts');

    const { data: userData, isLoading } =
        useQuery(['user-data', userId],
            () => UserServices.getUserById(userId), {
            enabled: !!userId,
        });
    const userMemoData = useMemo(
        () => userData?.data?.results,
        [userData]
    )

    const { mutateAsync: unfollowUserRequest } = useMutation(AuthServices.unfollowUser, {
        onSuccess: () => {
            queryClient.invalidateQueries('user-data');
            console.log('User unfollowed.');
        },
        onError: (error) => {
            console.error(error.msg);
        }
    });

    const unfollowUserHandler = async (userId) => {
        if (!token) {
            navigate('/login');
            return;
        }
        await unfollowUserRequest(userId);
    };

    const { mutateAsync: followUserRequest } = useMutation(AuthServices.followUser, {
        onSuccess: () => {
            queryClient.invalidateQueries('user-data');
            console.log('User followed.');
        },
        onError: (error) => {
            if (error.msg === 'You are already following.') {
                setIsFollowed(true);
            }
            console.error(error.msg);
        }
    });

    const { data: postsData, isLoading: postsLoading } = useQuery(['posts-data', userId],
        () => PostServices.getPosts(userId), {
        enabled: !!userId,
    });

    const postsMemoData = useMemo(
        () => postsData?.data?.results || [],
        [postsData]
    );
    console.log(postsMemoData, 'postsMemoData')
    const { data: workoutData, isLoading: workoutLoading } = useQuery(
        ['workout-data', userId],
        () => WorkoutServices.getWorkouts(userId),
        {
            enabled: !!userId,
            staleTime: 1000 * 60,
        }
    );

    const workoutMemoData = useMemo(
        () => workoutData?.data?.results || [],
        [workoutData]
    );

    console.log(workoutMemoData, 'workoutMemoData');

    const followUserHandler = async (userId) => {
        if (!token) {
            navigate('/login');
            return;
        }
        await followUserRequest(userId);
    };
    // const userMemoData = {
    //     username: 'Victoria',
    //     email: 'victoriaabc@gmail.com',
    //     about: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    //     profileImage: image,
    //     followers: [...Array(690)],
    //     following: [...Array(500)]
    // }

    // const formatDate = (timestamp) => {
    //     const date = new Date(timestamp);
    //     return date.toLocaleDateString('en-US', {
    //         weekday: 'long',
    //         year: 'numeric',
    //         month: 'short',
    //         day: 'numeric',
    //     });
    // };

    return (
        <div>
            <div className='relative'>
                <img src={bgImage} className='h-72 w-full' alt="" />
                <div className='absolute top-36 left-12 lg:left-20 border-4 border-double dark:border-[#efeeb6] border-lime-500 rounded-full p-1 h-64 w-64'>
                    <img
                        // src={userMemoData?.profileImage}
                        src={`https://fitness-tracker-backend-1-vqav.onrender.com/${userMemoData?.profileImage}`}
                        className='h-full w-full bg-contain rounded-full'
                        alt=""
                    />
                </div>
                <div className='flex flex-col lg:flex-row justify-around mt-4'>
                    <div className='lg:w-7/12'>
                        <div className='flex justify-center mt-28 lg:mt-0'>
                            <p className='dark:text-white text-black font-bold text-3xl lg:ml-[22rem] text-center lg:text-left'>{userMemoData?.username}</p>
                            <div className="flex w-full justify-end md:justify-evenly text-black dark:text-white">
                                <div className='text-center mr-10 md:mr-0'>
                                    <p className='font-bold text-lg'>Followers</p>
                                    <p>{userMemoData?.followers.length}</p>
                                </div>
                                <div className='text-center mr-20 md:mr-0'>
                                    <p className='font-bold text-lg'>Following</p>
                                    <p>{userMemoData?.following.length}</p>
                                </div>
                            </div>
                        </div>
                        <p className='text-zinc-600 dark:text-zinc-300 lg:ml-[22rem] text-center lg:text-left mt-4'>
                            {userMemoData?.about}
                        </p>
                        <button
                            className='bg-[#262135] text-white font-bold w-40 flex justify-center px-4 py-2 rounded-lg lg:ml-[22rem] text-center lg:text-left mt-4'
                            onClick={() => {
                                if ((userMemoData?.followers || []).includes(loggedInUserId)) {
                                    unfollowUserHandler(userMemoData?._id);
                                } else {
                                    followUserHandler(userMemoData?._id);
                                }
                            }}
                        >
                            {userMemoData?._id === loggedInUserId
                                ? 'Edit Profile'
                                : (userMemoData?.followers || []).includes(loggedInUserId)
                                    ? 'UnFollow'
                                    : 'Follow'
                            }
                        </button>
                        <div>
                            <div className="flex justify-evenly font-bold mt-4">
                                <p
                                    className={`text-xl cursor-pointer ${isTab === 'posts' ? 'border-b-2' : 'border-none'} border-black p-2`}
                                    onClick={() => setIsTab('posts')}
                                >
                                    Posts
                                </p>
                                <p
                                    className={`text-xl cursor-pointer ml-4 ${isTab === 'workouts' ? 'border-b-2' : 'border-none'} border-black p-2`}
                                    onClick={() => setIsTab('workouts')}
                                >
                                    Workouts
                                </p>
                            </div>
                            <div>
                                {isTab === 'posts'
                                    ?
                                    <div>
                                        {postsMemoData && postsMemoData.map((singleData, index) => (
                                            <PostCard
                                                key={index}
                                                data={singleData}
                                            />
                                        ))}
                                    </div>
                                    :
                                    <div>
                                        {workoutMemoData && workoutMemoData.map((singleData, index) => (
                                            <div key={index} className='border-2 p-4'>
                                                <p className='text-xl'>{singleData?.title}</p>
                                                <div className="flex text-zinc-600">
                                                    <p>{singleData?.exercises.exerciseName} {"=>"}</p>
                                                    <p className='ml-2'>{singleData?.exercises.notes}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                }
                            </div>
                        </div>
                    </div>

                    <div className='p-8 bg-gradient-to-t from-lime-300 to-[#1b1b1c] rounded-3xl lg:w-2/5 my-4 lg:mt-0'>
                        <div className='flex text-white justify-between'>
                            <p className='text-2xl font-bold'>Month reports</p>
                            <p>/2024</p>
                        </div>
                        <ul>
                            <li className='py-4 mt-6 px-6 rounded-full flex justify-between items-center cursor-pointer bg-[#fcc6e6] hover:bg-opacity-90'>
                                <p>running, monday</p>
                                <i><ICONS.RUN /></i>
                            </li>
                            <li className='py-4 mt-4 px-6 rounded-full flex justify-between items-center cursor-pointer bg-[#262135] text-white hover:bg-opacity-90'>
                                <p>Bedtime, monday</p>
                                <i><ICONS.SLEEP /></i>
                            </li>
                            <li className='py-4 mt-4 px-6 rounded-full flex justify-between items-center cursor-pointer bg-[#262135] text-white hover:bg-opacity-90'>
                                <p>Meal, monday</p>
                                <i><ICONS.MEAL /></i>
                            </li>
                            <li className='flex justify-end mt-4 cursor-pointer'>
                                <p className='text-black bg-white h-10 px-4 py-2 active:text-sm rounded-full text-center'>
                                    See All
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
