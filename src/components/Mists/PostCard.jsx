import React from 'react';
import { getUserIdFromToken } from '../../services/authServices';
import ICONS from '../../assets/constants/icons';

const loggedInUserId = getUserIdFromToken(localStorage.getItem('token'));

const PostCard = (props) => {
    const {
        key,
        data,
        likePostHandler,
        disLikePostHandler,
        followUserHandler = () => { },
        visitProfile = () => { }
    } = props;
    return (
        <>
            <div
                key={key}
                className="m-4"
            >
                <div className="flex items-center">
                    <div className="relative">
                        {
                            data?.author &&
                            (!data.author.followers?.includes(loggedInUserId) &&
                            data.author._id !== loggedInUserId) && (
                                <i
                                    className="absolute -right-1 -bottom-0 text-lg cursor-pointer bg-lime-300 rounded-full"
                                >
                                    <ICONS.FOLLOW
                                        onClick={() => followUserHandler(data.author._id)}
                                    />
                                </i>
                            )
                        }
                        <img
                            src={`${data.author.profileImage}`}
                            className="cursor-pointer rounded-full h-10 w-10 ml-2 border-double border-2 border-[#6a4b5d] p-1"
                            alt="profile image"
                            onClick={() => visitProfile(data?.author?._id)}
                        />
                    </div>
                    <p className="font-bold text-black ml-2">
                        {data.author.username}
                    </p>
                </div>
                <div className="h-40 w-40 md:h-60 md:w-60 lg:h-72 lg:w-72 p-2">
                   {data?.image ? <img
                        className="mt-2 rounded-md h-full w-full border-2 border-black"
                        src={`${data?.image}`} alt="" />
                    :
                    <ICONS.PROFILE className="mt-2 rounded-md h-full w-full border-2 border-black"/>    
                    }
                </div>
                <div className="flex items-center mt-2 mx-5 h-8 justify-between w-36 md:w-56 lg:w-72">
                    <div className="flex">
                        {
                            data?.likes.includes(loggedInUserId) ?
                                <ICONS.LIKED className="text-md md:text-xl text-red-500 mt-1 active:text-[0.9rem] md:active:text-[1.4rem] cursor-pointer" onClick={() => disLikePostHandler(data._id)} />
                                :
                                <ICONS.LIKE className="text-xl md:text-2xl active:text-[1rem] md:active:text-[1.6rem] cursor-pointer" onClick={() => likePostHandler(data._id)} />
                        }
                        <p className="ml-1">{data?.likes.length}</p>
                    </div>
                    {/* <div>
                        <ICONS.COMMENT className="md:mt-1 text-xl md:text-2xl hover:text-[1.4rem] md:hover:text-[1.6rem] cursor-pointer" />
                    </div> */}
                </div>
                <p className="mt-1 ml-4 text-xs md:text-md">{data.content}</p>
            </div>
        </>
    )
}
export default PostCard;