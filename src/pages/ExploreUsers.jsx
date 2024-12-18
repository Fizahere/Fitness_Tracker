import { useMutation, useQuery } from "react-query";
import { useMemo, useState } from "react";
import { AuthServices, getUserIdFromToken } from "../services/authServices";
import userImage from '../assets/images/user.jpg';
import ICONS from "../assets/constants/icons";
import { useNavigate } from "react-router-dom";
import { PostServices } from "../services/postServices";

const loggedInUserId = getUserIdFromToken(localStorage.getItem('token'));

const ExploreUsers = () => {
    const [isForyou, setIsForyou] = useState('foryou');
    const navigate = useNavigate();
    const [isFollowed, setIsFollowed] = useState(false);
    // const [isLiked, setIsLiked] = useState(false)
    const token = localStorage.getItem('token');
    //set valye of comment
    const [comment, setComment] = useState('')

    const { data: allPosts, isLoading: postLoading } = useQuery(
        'all-posts',
        PostServices.getAllPosts
    );
    const allPostsMemoData = useMemo(
        () => allPosts?.results || [],
        [allPosts]
    );

    const { mutateAsync: followUserRequest } = useMutation(AuthServices.followUser, {
        onSuccess: () => {
            queryClient.invalidateQueries('all-posts');
            console.log('User followed.');
        },
        onError: (error) => {
            if (error.msg === 'You are already following.') {
                setIsFollowed(true);
            }
            console.error(error.msg);
        }
    });
    const { mutateAsync: unfollowUserRequest } = useMutation(AuthServices.unfollowUser, {
        onSuccess: () => {
            queryClient.invalidateQueries('all-posts');
            console.log('User unfollowed.');
        },
        onError: (error) => {
            // if (error.msg === 'You are already following.') {
            //     setIsFollowed(true);
            // }
            console.error(error.msg);
        }
    });

    const followUserHandler = async (userId) => {
        if (!token) {
            navigate('/login');
            return;
        }
        await followUserRequest(userId);
    };
    //did'nt apply yet,
    const unfollowUserHandler = async (userId) => {
        if (!token) {
            navigate('/login');
            return;
        }
        await unfollowUserRequest(userId);
    };

    const visitProfile = (userId) => {
        if (!token) {
            navigate('/login');
            return;
        }
        navigate('/profile')
    }

    const { mutateAsync: likePostRequest } = useMutation(
        PostServices.LikePost,
        {
            onSuccess: () => {
                queryClient.invalidateQueries('all-posts');
                console.log('Liked Post')
            },
            onError: (error) => {
                console.log(error.message, 'error in request.')
            }
        }
    )

    const { mutateAsync: disLikePostRequest } = useMutation(
        PostServices.DisLikePost,
        {
            onSuccess: () => {
                queryClient.invalidateQueries('all-posts');
                console.log('Disliked Post')
            },
            onError: (error) => {
                console.log(error.message, 'error in request.')
            }
        }
    )

    const likePostHandler = async (postId) => {
        if (!token) {
            navigate('/login');
            return;
        }
        await likePostRequest(postId)
        queryClient.invalidateQueries('all-posts');

    }
    const disLikePostHandler = async (postId) => {
        if (!token) {
            navigate('/login');
            return;
        }
        await disLikePostRequest(postId)
        queryClient.invalidateQueries('all-posts');
    }
    const { mutateAsync: addCommentRequest } = useMutation(
        PostServices.AddComment,
        {
            onSuccess: () => {
                queryClient.invalidateQueries('all-posts');
                console.log('comment added.')
            },
            onError: (error) => {
                console.log(error.message, 'error on comment request.')
            }
        }
    )
    //call this fuctiom
    const addCommentHandler = async (postId) => {
        await addCommentRequest(postId, comment)
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
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-8 gap-2">
                                {allPostsMemoData ? (
                                    allPostsMemoData.map((singleData, index) => (
                                        <div
                                            key={index}
                                            className="m-4"
                                        >
                                            <div className="flex items-center">
                                                <div className="relative">
                                                    {
                                                        !singleData?.author?.followers.includes(loggedInUserId) &&
                                                        singleData?.author?._id !== loggedInUserId && (
                                                            <i
                                                                className="absolute -right-1 -bottom-0 text-lg cursor-pointer bg-lime-300 rounded-full"
                                                            >
                                                                <ICONS.FOLLOW
                                                                    onClick={() => followUserHandler(singleData?.author?._id)}
                                                                />
                                                            </i>
                                                        )
                                                    }
                                                    <img
                                                        src={`https://fitness-tracker-backend-1-vqav.onrender.com/${singleData.author.profileImage}`}
                                                        className="cursor-pointer rounded-full h-10 w-10 ml-2 border-double border-2 border-[#6a4b5d] p-1"
                                                        alt="profile image"
                                                        onClick={() => visitProfile(singleData?.author?._id)}
                                                    />
                                                </div>
                                                <p className="font-bold text-black ml-2">
                                                    {singleData.author.username}
                                                </p>
                                            </div>
                                            <div className="h-72 w-72 p-2">
                                                <img
                                                    className="mt-2 rounded-md h-full w-full border-2 border-black"
                                                    src={`https://fitness-tracker-backend-1-vqav.onrender.com/${singleData.image}`} alt="" />
                                            </div>
                                            <div className="flex items-center mt-2 mx-5 h-8 justify-between">
                                                <div className="flex">
                                                    {
                                                        singleData?.likes.includes(loggedInUserId)?
                                                            <ICONS.LIKED className="text-xl text-red-500 mt-1 active:text-[1.4rem] cursor-pointer" onClick={() => disLikePostHandler(singleData._id)} />
                                                            :
                                                            <ICONS.LIKE className="text-2xl active:text-[1.6rem] cursor-pointer" onClick={() => likePostHandler(singleData._id)} />
                                                    }
                                                    <p className="ml-1">{singleData?.likes.length}</p>
                                                </div>
                                                <div>
                                                    <ICONS.COMMENT className="mt-1 text-2xl hover:text-[1.6rem] cursor-pointer" />
                                                </div>
                                            </div>
                                            <p className="mt-1 ml-4">{singleData.content}</p>
                                        </div>
                                    ))
                                ) : (
                                    postLoading ? (
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
                                {allPostsMemoData ? (
                                    allPostsMemoData.map((singleData, index) => (
                                        <>
                                            {singleData?.author?.followers.includes(loggedInUserId) &&
                                                <div
                                                    key={index}
                                                    className="bg-[#e5e6e1] rounded-xl p-4 m-4 flex justify-between items-center"
                                                >
                                                    <div>
                                                        <div className="flex items-center">
                                                            <div className="relative">
                                                                {
                                                                    !singleData?.author?.followers.includes(loggedInUserId) &&
                                                                    singleData?.author?._id !== loggedInUserId && (
                                                                        <i
                                                                            className="absolute right-0 bottom-1 text-xl cursor-pointer bg-lime-300 rounded-full"
                                                                        >
                                                                            <ICONS.FOLLOW
                                                                                onClick={() => followUserHandler(singleData?.author?._id)}
                                                                            />
                                                                        </i>
                                                                    )
                                                                }
                                                                <img
                                                                    src={`https://fitness-tracker-backend-1-vqav.onrender.com/${singleData.author.profileImage}`}
                                                                    className="cursor-pointer rounded-full h-14 w-14 border-double border-2 border-[#6a4b5d] p-1"
                                                                    alt="profile image"
                                                                    onClick={() => visitProfile(singleData?.author?._id)}
                                                                />
                                                            </div>
                                                            <p className="font-bold text-black ml-2">
                                                                {singleData.userId.username}
                                                            </p>
                                                        </div>
                                                        <p className="text-lg ml-10">{singleData.author?.username}</p>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        {
                                                            isLiked ?
                                                                <ICONS.LIKED className="text-xl mt-1 hover:text-[1.6rem] cursor-pointer" onClick={() => disLikePostHandler(singleData._id)} />
                                                                :
                                                                <ICONS.LIKE className="text-2xl hover:text-[1.6rem] cursor-pointer" onClick={() => likePostHandler(singleData._id)} />
                                                        }
                                                    </div>
                                                </div>
                                            }
                                        </>
                                    ))
                                ) : (
                                    postLoading ? (
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
