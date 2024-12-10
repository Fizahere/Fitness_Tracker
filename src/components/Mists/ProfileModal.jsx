import React from 'react';
import ICONS from '../../assets/constants/icons';
import { Link } from 'react-router-dom';

const ProfileModal = ({ isOpen, onClose, user, position }) => {
    if (!isOpen) return null;

    return (
        <div
            className="absolute top-12 lg:right-7 bg-white dark:bg-[#1b1b1c] dark:text-white text-black rounded-lg shadow-5xl p-10 z-50"
            style={{ top: position.top, left: position.left }}
        >
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-xl"
            >
                <ICONS.CLOSE/>
            </button>
            <div className="flex flex-col items-center">
                <img
                    src={'https://i.pinimg.com/736x/67/6f/15/676f1545c9539c15809b3c5595b6986f.jpg'}
                    alt={'Fiza'}
                    className="w-28 h-28 rounded-full mb-3 border-4 border-double border-[#6a4b5d] p-1"
                />
                <p className="font-semibold">Fiza</p>
                <p className="text-sm">fizabatool028@gmail.com</p>
                <Link to={'/profile'}>
                <i className='mt-2 text-xl' onClick={onClose}><ICONS.PENCIL/></i>
                </Link>
            </div>
        </div>
    );
};

export default ProfileModal;
