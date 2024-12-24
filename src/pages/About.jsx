import React from 'react';
import th from '../assets/images/th.jpg';

const About = () => {
  return (
    <>
      <section className="px-10 py-10 h-auto bg-white text-black" id="about">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col justify-center">
            <div className="border-2 border-black p-1 w-44 h-8 ml-8 rounded-full hover:bg-lime-300  flex items-center justify-center text-center text-sm font-semibold">
              Empower Your Progress
            </div>
            <h2 className="font-bold text-[20px] sm:text-[40px] font-serif mt-3">
              Fitness Tracker Rock!
            </h2>
            <h3 className="font-bold text-[12px] sm:text-[20px] mt-2">
              "Track Your Fitness Journey: Stay Motivated, Stay Healthy!"
            </h3>
            <p className="mt-4 text-[10px] sm:text-[12px] md:text-[12px]font-thin">
              Our fitness tracker website helps you stay on top of your health and fitness goals with ease. From tracking daily activities and workouts to monitoring your progress over time, our platform offers real-time insights to keep you motivated.
            </p>
          </div>
          <div className="w-full md:w-[400px] mx-auto  md:mt-0">
            <img src={th} alt="Fitness Tracker" className="w-full h-[300px] rounded-lg object-cover" />
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
