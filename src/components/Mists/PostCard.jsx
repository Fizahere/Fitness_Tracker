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
        
        <div className="max-w-sm w-full lg:max-w-full lg:flex">
        <div
  className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
  style={{
    backgroundImage: `url(https://fitness-tracker-backend-1-vqav.onrender.com/${data.author.profileImage})`,
  }}
  title={data.author.name || "Author's Profile"}
></div>

      <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
        <div className="mb-8">
          <p className="text-sm text-gray-600 flex items-center">
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
            Members only
          </p>
          <div className="text-gray-900 font-bold text-xl mb-2">
          {data.author.username}
          </div>
          <p className="text-gray-700 text-base">
          {data.content}
          </p>
        </div>
        <div className="flex items-center">
          <img
            className="w-10 h-10 rounded-full mr-4"
            src={`https://fitness-tracker-backend-1-vqav.onrender.com/${data.author.profileImage}`}
            alt="Avatar of Jonathan Reinink"
          />
          <div className="text-sm">
            <p className="text-gray-900 leading-none">Jonathan Reinink</p>
            <p className="text-gray-600">Aug 18</p>
          </div>
        </div>
      </div>
    </div>
            {/* <div
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
                            src={`https://fitness-tracker-backend-1-vqav.onrender.com/${data.author.profileImage}`}
                            className="cursor-pointer rounded-full h-10 w-10 ml-2 border-double border-2 border-[#6a4b5d] p-1"
                            alt="profile image"
                            onClick={() => visitProfile(data?.author?._id)}
                        />
                    </div>
                    <p className="font-bold text-black ml-2">
                        {data.author.username}
                    </p>
                </div>
                <div className="h-72 w-72 p-2">
                    <img
                        className="mt-2 rounded-md h-full w-full border-2 border-black"
                        src={`https://fitness-tracker-backend-1-vqav.onrender.com/${data.image}`} alt="" />
                </div>
                <div className="flex items-center mt-2 mx-5 h-8 justify-between">
                    <div className="flex">
                        {
                            data?.likes.includes(loggedInUserId) ?
                                <ICONS.LIKED className="text-xl text-red-500 mt-1 active:text-[1.4rem] cursor-pointer" onClick={() => disLikePostHandler(data._id)} />
                                :
                                <ICONS.LIKE className="text-2xl active:text-[1.6rem] cursor-pointer" onClick={() => likePostHandler(data._id)} />
                        }
                        <p className="ml-1">{data?.likes.length}</p>
                    </div>
                    <div>
                        <ICONS.COMMENT className="mt-1 text-2xl hover:text-[1.6rem] cursor-pointer" />
                    </div>
                </div>
                <p className="mt-1 ml-4">{data.content}</p>
            </div> */}
        </>
    )
}
export default PostCard;