import React, { useEffect, useState } from 'react'
import ICONS from '../assets/constants/icons'

const Dashboard = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
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
    return (
        <div className='bg-white dark:bg-black h-screen'>
            <div className='flex flex-col md:flex-row'>

                {/* first col */}
                <div className='bg-[#1b1b1c] w-1/6 px-10 py-10  rounded-r-3xl h-screen flex flex-col items-center'>
                    <i><ICONS.LOGO color='#fcc6e6' fontSize={40} /></i>
                    <ul className='mt-6 text-zinc-400'>
                        <li className='flex items-center mt-6 text-lg cursor-pointer'><i className='mr-4'><ICONS.HOME /></i>Overview</li>
                        <li className='flex items-center mt-6 text-lg cursor-pointer'><i className='mr-4'><ICONS.WORKOUT /></i>Workout</li>
                        <li className='flex items-center mt-6 text-lg cursor-pointer'><i className='mr-4'><ICONS.NUTRITION /></i>Nutrition</li>
                        <li className='flex items-center mt-6 text-lg cursor-pointer'><i className='mr-4'><ICONS.PROGRESS /></i>Progress</li>
                        <li className='flex items-center mt-6 text-lg cursor-pointer'><i className='mr-4'><ICONS.PROFILE /></i>Profile</li>
                    </ul>
                </div>

                {/* scnd col */}
                <div className='w-[54%] p-10'>
                    <div className='flex justify-between'>
                        <div className='text-black dark:text-white flex'>
                            <i><ICONS.LOCATION fontSize={22} /></i>
                            <p className='ml-2'><b>Karachi,</b>Pakistan</p>
                        </div>
                        <div className='flex text-black dark:text-white items-center'>
                            <i className='cursor-pointer'><ICONS.RINGBELL fontSize={27} /></i>
                            <i className='ml-2 cursor-pointer'><ICONS.PROFILE fontSize={22} /></i>
                            <i className='ml-4 cursor-pointer' onClick={toggleDarkMode}>
                                {isDarkMode ? (
                                    <ICONS.SUN color='white' fontSize={27} />
                                )
                                    :
                                    (
                                        <ICONS.MOON color='black' fontSize={27} />
                                    )}
                            </i>
                        </div>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-10'>
                        <div className='px-20 py-10 bg-[#fffeca] flex flex-col items-center justify-center rounded-3xl'>
                            <i><ICONS.CLOCK fontSize={28} /></i>
                            <p className='text-zinc-700 mt-2'>Time</p>
                            <p className='text-3xl font-bold'>56m</p>
                        </div>
                        <div className='px-20 py-10 bg-[#e9dffa] flex flex-col items-center justify-center rounded-3xl'>
                            <i><ICONS.DISTANCE fontSize={30} /></i>
                            <p className='text-zinc-700 mt-3'>Total distance</p>
                            <p className='text-3xl font-bold'>15 h 5km</p>
                        </div>
                        <div className='px-20 py-10 bg-[#fad6ec] flex flex-col items-center justify-center rounded-3xl'>
                            <i><ICONS.FIRE fontSize={30} /></i>
                            <p className='text-zinc-700 mt-2'>Energy burn</p>
                            <p className='text-3xl font-bold'>1 345 kal</p>
                        </div>
                        <div className='px-20 py-10 bg-[#d8e6e6] flex flex-col items-center justify-center rounded-3xl'>
                            <i><ICONS.MOON fontSize={30} /></i>
                            <p className='text-zinc-700 mt-2'>Sleep</p>
                            <p className='text-3xl font-bold'>56m</p>
                        </div>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-8'>
                        <div className='bg-[#1b1b1c] py-8 px-10 flex flex-col items-center justify-center rounded-3xl'>
                            <i className='text-white text-5xl'><ICONS.SHOEDOWN /></i>
                            <p className='text-zinc-400 mt-2'>Contact</p>
                            <p className='text-lg  font-bold text-white'>17 min</p>
                            <p className='text-zinc-400 mt-2'>Fight time</p>
                            <p className='text-lg  font-bold text-white'>17 min</p>
                        </div>
                        <div className='bg-[#1b1b1c] py-8 px-10 flex flex-col items-center justify-center rounded-3xl'>
                            <i className='text-white text-5xl'><ICONS.SHOEUP /></i>
                            <p className='text-zinc-400 mt-2'>Contact</p>
                            <p className='text-lg  font-bold text-white'>17 min</p>
                            <p className='text-zinc-400 mt-2'>Fight time</p>
                            <p className='text-lg  font-bold text-white'>17 min</p>
                        </div>
                        <div className='bg-[#1b1b1c] py-8 px-10 flex flex-col items-center justify-center rounded-3xl'>
                            <i className='mt-2 text-white text-5xl'><ICONS.CHART2 /></i>
                            <p className='text-zinc-400 mt-2'>Symentry</p>
                            <i className='text-white text-5xl'><ICONS.CHART1 /></i>
                            <p className='text-lg  font-bold text-white'>99%</p>
                        </div>
                    </div>
                </div>

                {/* third col */}
                <div className='w-[30%] bg-[#1b1b1c] m-4 rounded-3xl p-8'>
                    <p className='text-3xl text-white'>Activity Tracking</p>
                    <p className='text-zinc-400'>Tuesday, 26 November</p>
                </div>

            </div>
    // </div>
    )
}

export default Dashboard

