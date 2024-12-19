import { useMutation, useQuery, useQueryClient } from "react-query";
import { useMemo, useState } from "react";
import { AuthServices, getUserIdFromToken } from "../services/authServices";
import userImage from '../assets/images/user.jpg';
import ICONS from "../assets/constants/icons";
import { useNavigate } from "react-router-dom";
import { PostServices } from "../services/postServices";
import PostCard from "../components/Mists/PostCard";
import { UserServices } from "../services/userServices";

const loggedInUserId = getUserIdFromToken(localStorage.getItem('token'));

const ExploreUsers = () => {
    const [isForyou, setIsForyou] = useState('foryou');
    const navigate = useNavigate();
    const [isFollowed, setIsFollowed] = useState(false);
    const token = localStorage.getItem('token');
    //set valye of comment
    const [comment, setComment] = useState('')
    const queryClient = useQueryClient();

    const { data: allPosts, isLoading: postLoading } = useQuery(
        'all-posts',
        PostServices.getAllPosts
    );
    const allPostsMemoData = useMemo(
        () => allPosts?.results || [],
        [allPosts]
    );

    const { data: allUsersData, isLoading: usersLoading } = useQuery(
        'users-data',
        UserServices.getAllUsers
    )

    const allUsersMemoData = useMemo(
        () => allUsersData?.results,
        [allUsersData]
    )
    const displayUsers = allUsersMemoData?.slice(0, 5)

    const { mutateAsync: followUserRequest } = useMutation(AuthServices.followUser, {
        onSuccess: () => {
            queryClient.invalidateQueries(['all-posts', 'users-data']);
            console.log('User followed.');
        },
        onError: (error) => {
            if (error.msg === 'You are already following.') {
                setIsFollowed(true);
            }
            console.error(error.msg);
        }
    });

    const followUserHandler = async (userId) => {
        if (!token) {
            navigate('/login');
            return;
        }
        await followUserRequest(userId);
        queryClient.invalidateQueries(['all-posts', 'users-data']);
    };

    const { mutateAsync: unfollowUserRequest } = useMutation(AuthServices.unfollowUser, {
        onSuccess: () => {
            queryClient.invalidateQueries('users-data');
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
        queryClient.invalidateQueries('users-data');
    };

    const visitProfile = (userId) => {
        if (!token) {
            navigate('/login');
            return;
        }
        navigate(`/visit-profile/${userId}`)
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
        <div className="min-h-screen bg-white flex flex-col lg:flex-row">
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
                    {isForyou === 'foryou' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-8 md:gap-20 lg:gap-3">
                            {allPostsMemoData ? (
                                allPostsMemoData.map((singleData, index) => (
                                    <PostCard
                                        key={index}
                                        data={singleData}
                                        likePostHandler={likePostHandler}
                                        disLikePostHandler={disLikePostHandler}
                                        followUserHandler={followUserHandler}
                                        visitProfile={visitProfile}
                                    />
                                ))
                            ) : (
                                Loading ? (
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
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-8">
                            {
                                allPostsMemoData && allPostsMemoData.filter((singleData) =>
                                    singleData?.author?.followers?.includes(loggedInUserId)
                                ).length > 0 ? (
                                    allPostsMemoData
                                        .filter((singleData) =>
                                            singleData?.author?.followers?.includes(loggedInUserId)
                                        )
                                        .map((singleData, index) => (
                                            <PostCard
                                                key={index}
                                                data={singleData}
                                                Loading={postLoading}
                                                likePostHandler={likePostHandler}
                                                disLikePostHandler={disLikePostHandler}
                                                followUserHandler={followUserHandler}
                                                visitProfile={visitProfile}
                                            />
                                        ))
                                ) : postLoading ? (
                                    <i className="flex justify-center">
                                        <ICONS.LOADING className="animate-spin text-2xl my-56" />
                                    </i>
                                ) : (
                                   <div className="flex items-center justify-center w-screen">
                                     <p className="my-56 text-zinc-700 flex">
                                        {allPostsMemoData?.some(post => post?.author?.followers?.length > 0)
                                            ? "You haven't followed anyone"
                                            : "Check your internet connection"}
                                    </p>
                                   </div>
                                )
                            }
                        </div>
                    )}
                </div>
            </div>
            <div className="w-auto md:w-1/4 md:mt-14">
                <h3 className="text-2xl font-bold ml-4">Explore Users</h3>
                {displayUsers && displayUsers.map((singleData, index) => (
                    <div
                        key={index}
                        className="bg-[#e5e6e1] rounded-xl p-4 m-4 flex justify-between items-center"
                    >
                        <div>
                            <div className="flex items-center">
                                <img
                                    src={`https://fitness-tracker-backend-1-vqav.onrender.com/${singleData?.profileImage}`}
                                    className="rounded-full h-14 w-14 border-double border-2 border-[#6a4b5d] p-1"
                                    alt="profile image"
                                />
                                <p className="font-bold text-black ml-2 text-sm">{singleData?.username}</p>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <button className="border-2 border-black bg-lime-300 w-24 text-sm py-1 rounded-lg"
                                onClick={() => {
                                    if ((singleData?.followers || []).includes(loggedInUserId)) {
                                        unfollowUserHandler(singleData?._id);
                                    } else {
                                        followUserHandler(singleData?._id);
                                    }
                                }}
                            >
                                {singleData?._id === loggedInUserId
                                    ? 'Edit Profile'
                                    : (singleData?.followers || []).includes(loggedInUserId)
                                        ? 'UnFollow'
                                        : 'Follow'
                                }
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default ExploreUsers;
