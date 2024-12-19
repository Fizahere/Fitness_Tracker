import { useMutation, useQuery, useQueryClient } from "react-query";
import { useMemo, useState } from "react";
import { AuthServices, getUserIdFromToken } from "../services/authServices";
import userImage from '../assets/images/user.jpg';
import ICONS from "../assets/constants/icons";
import { useNavigate } from "react-router-dom";
import { PostServices } from "../services/postServices";
import PostCard from "../components/Mists/PostCard";

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

    const followUserHandler = async (userId) => {
        if (!token) {
            navigate('/login');
            return;
        }
        await followUserRequest(userId);
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
                    {isForyou === 'foryou' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-8 gap-2">
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
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                            {allPostsMemoData ? (
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
                                <p className="my-56 text-zinc-700 flex items-center justify-center">
                                    Check your internet connection
                                </p>
                            )}
                        </div>
                    )}
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
