import React, { useEffect, useState } from 'react'
import ICONS from '../assets/constants/icons'
import { Link, Outlet } from 'react-router-dom';

const Dashboard = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const savedDarkMode = localStorage.getItem("darkMode");
        if (savedDarkMode === "enabled") {
            setIsDarkMode(true);
            document.documentElement.classList.add("dark");
        } else if (savedDarkMode === "disabled") {
            setIsDarkMode(false);
            document.documentElement.classList.remove("dark");
        } else {
            if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
                setIsDarkMode(true);
                document.documentElement.classList.add("dark");
            }
        }
    }, []);

    const toggleDarkMode = () => {
        setIsDarkMode((prevMode) => {
            const newMode = !prevMode;
            if (newMode) {
                document.documentElement.classList.add("dark");
                localStorage.setItem("darkMode", "enabled");
            } else {
                document.documentElement.classList.remove("dark");
                localStorage.setItem("darkMode", "disabled");
            }
            return newMode;
        });
    };
    const toggleSideBar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }

    return (
        <div className='bg-white dark:bg-black min-h-screen'>
            <div className='flex flex-col md:flex-row'>
                <div className='pt-4 ml-3 flex md:hidden justify-between items-center text-black dark:text-white'>
                    <div className='flex items-center'>
                        <i className='cursor-pointer' onClick={toggleSideBar}><ICONS.HAMBURGER fontSize={20} /></i>
                        <Link to={'/home'}><i><ICONS.LOGO className='ml-2' fontSize={28} /></i></Link>
                    </div>
                    <div className='flex text-black dark:text-white items-center'>
                        <i className='cursor-pointer'><ICONS.RINGBELL fontSize={27} /></i>
                        <i className='ml-4 cursor-pointer' onClick={toggleDarkMode}>
                            {isDarkMode ? (
                                <ICONS.SUN color='white' fontSize={27} />
                            )
                                :
                                (
                                    <ICONS.MOON color='black' fontSize={27} />
                                )}
                        </i>
                        <Link to={'/profile'}>
                            <div className='border-2 border-black dark:border-white rounded-full p-1.5 mx-2'>
                                <ICONS.PROFILE className='cursor-pointer' fontSize={16} />
                            </div>
                        </Link>
                    </div>
                </div>
                <div className={`bg-[#1b1b1c] w-1/6 px-10 py-10 rounded-r-3xl min-h-screen hidden md:flex flex-col items-center`}>
                    <Link to={'/home'}><i><ICONS.LOGO color='#fcc6e6' fontSize={40} /></i></Link>
                    <ul className='mt-6 text-zinc-400'>
                        <Link to={'/home'}>
                            <li className='flex items-center mt-6 text-lg cursor-pointer'><i className='mr-4'><ICONS.HOME /></i>Overview</li>
                        </Link>
                        <Link to={'/workout'}>
                            <li className='flex items-center mt-6 text-lg cursor-pointer'><i className='mr-4'><ICONS.WORKOUT /></i>Workout</li>
                        </Link>
                        <Link to={'/nutrition'}>
                            <li className='flex items-center mt-6 text-lg cursor-pointer'><i className='mr-4'><ICONS.NUTRITION /></i>Nutrition</li>
                        </Link>
                        <Link to={'/progress'}>
                            <li className='flex items-center mt-6 text-lg cursor-pointer'><i className='mr-4'><ICONS.PROGRESS /></i>Progress</li>
                        </Link>
                        <Link to={'/profile'}>
                            <li className='flex items-center mt-6 text-lg cursor-pointer'><i className='mr-4'><ICONS.PROFILE /></i>Profile</li>
                        </Link>
                    </ul >
                </div >

                <div className='w-full'>
                    <div className='flex justify-between h-20 mx-4 items-center'>
                        <div className='text-black dark:text-white flex'>
                            <i><ICONS.LOCATION fontSize={22} /></i>
                            <p className='ml-2'><b>Karachi,</b>Pakistan</p>
                        </div>
                        <div className='hidden md:flex text-black dark:text-white items-center'>
                            <i className='cursor-pointer'><ICONS.RINGBELL fontSize={27} /></i>
                            <i className='ml-4 cursor-pointer' onClick={toggleDarkMode}>
                                {isDarkMode ? (
                                    <ICONS.SUN color='white' fontSize={27} />
                                )
                                    :
                                    (
                                        <ICONS.MOON color='black' fontSize={27} />
                                    )}
                            </i>
                            <Link to={'/profile'}>
                                <div className='border-2 border-black dark:border-white rounded-full p-1.5 ml-2'>
                                    <ICONS.PROFILE className='cursor-pointer' fontSize={16} />
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className='px-3'>
                        <Outlet />
                    </div>
                </div>

            </div >

            {/* sidebar for mob srren */}
            < aside className={`fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={toggleSideBar} >
                <div className={`fixed top-0 left-0 transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                 bg-[#1b1b1c] w-72 px-6 py-8 rounded-r-3xl h-full ${isSidebarOpen ? 'flex' : 'hidden'} z-10 md:hidden flex-col`}
                    onClick={(e) => { e.stopPropagation() }}
                >
                    <div className='flex justify-between items-center'>
                        <Link to={'/home'}><i className='cursor-pointer' onClick={toggleSideBar}><ICONS.LOGO color='#fcc6e6' fontSize={35} /></i></Link>
                        <i className='cursor-pointer' onClick={toggleSideBar}><ICONS.CLOSE color='#fcc6e6' fontSize={25} /></i>
                    </div>
                    <ul className='mt-6 text-zinc-400'>
                        <Link to={'/home'}>
                            <li className='flex items-center mt-6 text-lg cursor-pointer' onClick={toggleSideBar}><i className='mr-4'><ICONS.HOME /></i>Overview</li>
                        </Link>
                        <Link to={'/workout'}>
                            <li className='flex items-center mt-6 text-lg cursor-pointer' onClick={toggleSideBar}><i className='mr-4'><ICONS.WORKOUT /></i>Workout</li>
                        </Link>
                        <Link to={'/nutrition'}>
                            <li className='flex items-center mt-6 text-lg cursor-pointer' onClick={toggleSideBar}><i className='mr-4'><ICONS.NUTRITION /></i>Nutrition</li>
                        </Link>
                        <Link to={'/progress'}>
                            <li className='flex items-center mt-6 text-lg cursor-pointer' onClick={toggleSideBar}><i className='mr-4'><ICONS.PROGRESS /></i>Progress</li>
                        </Link>
                        <Link to={'/profile'}>
                            <li className='flex items-center mt-6 text-lg cursor-pointer' onClick={toggleSideBar}><i className='mr-4'><ICONS.PROFILE /></i>Profile</li>
                        </Link>
                    </ul>
                </div>
            </aside >
        </div >

    )
}

export default Dashboard

