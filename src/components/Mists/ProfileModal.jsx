import React, { useMemo, useState } from 'react';
import ICONS from '../../assets/constants/icons';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { UserServices } from '../../services/userServices';
import image from '../../assets/images/user.jpg'

const ProfileModal = ({ isProfileModalOpen, onProfileModalClose, user, position }) => {
    if (!isProfileModalOpen) return null;

    return (
        <div
            className="absolute border-2 dark:border-white border-black top-12 lg:right-7 bg-white dark:bg-[#1b1b1c] dark:text-white text-black rounded-lg z-50"
            style={{ top: position.top, left: position.left }}
        >
            <div className='h-20 bg-[#fcc6e6]
             relative'>
                {/* // bg-gradient-to-t to-[#fcc6e6] from-[#1b1b1c] */}
                <img
                    src={'https://i.pinimg.com/736x/67/6f/15/676f1545c9539c15809b3c5595b6986f.jpg'}
                    alt={'Fiza'}
                    className="absolute left-24 top-10 w-32 h-32 rounded-full mb-3 border-4 border-double border-[#6a4b5d] p-1"
                />
            </div>
            <div className='px-20 mt-24 mb-10'>
                <button
                    onClick={onProfileModalClose}
                    className="absolute top-4 right-4 text-xl text-black"
                >
                    <ICONS.CLOSE />
                </button>
                <div className="flex flex-col items-center">

                    <p className="font-semibold text-xl">Fiza</p>
                    <p className="text-sm">fizabatool028@gmail.com</p>
                    <Link to={'/profile'}>
                        <i className='mt-2 text-xl' onClick={onProfileModalClose}><ICONS.PENCIL /></i>
                    </Link>
                </div>
            </div>
        </div>
    );
};
const NotificationsModel = ({ isNotificationModalOpen, onNotificationModalClose, position }) => {
    if (!isNotificationModalOpen) return null;
    const [error, setError] = useState(null)

    const { data: notificationsData } = useQuery(
        'notification-data', UserServices.getNotifications,
        {
            onError: (error) => {
                if (error.message == 'Request failed with status code 404') {
                    setError('No Newer Notifications.')
                }
            }
        }
    )
    const notificationMemoData = useMemo(
        () => notificationsData?.data?.notifications,
        [notificationsData]
    )
    return (
        <div
            className="absolute border-2 dark:border-white border-black top-12 lg:right-7 bg-white dark:bg-[#1b1b1c] dark:text-white text-black rounded-lg z-50"
            style={{ top: position.top, left: position.left }}
        >
            <div className="flex justify-between px-4 py-6 text-black bg-[#fcc6e6]">
                <p className="text-xl">Notifications</p>
                <button
                    onClick={onNotificationModalClose}
                    className="text-xl"
                >
                    <ICONS.CLOSE />
                </button>
            </div>
            <div className="flex flex-col">
                <ul>
                    {/* {['Followed you', 'Liked your post', "You did'nt excercised today, it's still not too late."].map((msg, index) => (
                        <li className='border-y-2 border-black py-2 px-4 hover:bg-zinc-800 min-w-96 max-w-[28rem]'>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <img
                                        src={image}
                                        className='h-12 w-12 rounded-full mr-4 border-2 border-double cursor-pointer'
                                    />
                                    <p>Fiza -</p>
                                </div>
                                <p className='text-xs text-zinc-400'>2h ago</p>
                            </div>
                            <p className='ml-16'>Fiza {msg}.</p>
                        </li>
                    ))} */}
                    {notificationMemoData && notificationMemoData.map((singleNotification) => (
                        <li className='border-b-2 border-black p-4 hover:bg-zinc-800 min-w-96'>
                            <div className='flex items-center justify-between'>
                                <div className="flex items-center">
                                    {(singleNotification?.fromUser?.profileImage) ? <img
                                        src={`https://fitness-tracker-backend-1-vqav.onrender.com/${singleNotification?.fromUser?.profileImage}`} alt=""
                                        className='h-12 w-12 rounded-full mr-4 border-2 border-double cursor-pointer'
                                    />
                                        :
                                        <i>
                                            <ICONS.PROFILE className='text-white text-2xl'/>
                                        </i>
                                    }
                                    <p>{singleNotification?.fromUser?.username}</p>
                                </div>
                                <p className='text-xs text-zinc-400'>2h ago</p>
                            </div>
                            <p className='ml-16'>{singleNotification.message}</p>
                        </li>
                    ))}
                    <p className='text-center min-w-96'>{error && error}</p>
                </ul>
                <p className='h-10 flex items-center justify-center cursor-pointer text-zinc-400 hover:text-zinc-300 hover:underline active:text-sm'>view all</p>
            </div>
        </div>
    );
};

export const Models = {
    ProfileModal,
    NotificationsModel,
};
