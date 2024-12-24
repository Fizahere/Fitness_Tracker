import React from "react";
import ICONS from "../assets/constants/icons";
import ft1 from '../assets/images/ft1.png';
import ft2 from '../assets/images/ft1.png';
import ft3 from '../assets/images/ft1.png';
import bg from '../assets/images/bg.webp'
import phone from '../assets/images/phone.png'

const Home = () => {

  return (
    <>
      <section className="px-10 py-10 h-auto bg-white text-black" id="home">
        <div className="grid grid-cols-1 md:grid-cols-2 text-white  ">

          <div className="m-19">
            <h1 className="text-black font-serif font-bold text-3xl sm:text-4xl md:text-6xl">
              Your Health
            </h1>
            <h1 className="text-black font-serif font-bold text-3xl sm:text-4xl md:text-6xl">
              Our Plan
            </h1>
            <p className="mt-3 text-black sm:text-[8px] md:text-[12px] w-80">
              Track your fitness progress, set goals, and stay motivated with Fitness Tracker. Your personal fitness companion for a healthier lifestyle.            </p>
            <div className="relative inline-block">
              <button className="mt-5 bg-[#262135] text-white py-2 text-sm w-[120px] rounded-2xl relative">
                Join
                <div className="absolute top-0 left-[110px]">
                  <button className="bg-lime-300 text-black p-2 mt-1 rounded-full text-xs">
                    <i>
                      <ICONS.RIGHTARROW fontSize={13} />
                    </i>
                  </button>
                </div>
              </button>
            </div>
            <div className="bg-black w-full max-w-[300px] sm:max-w-[400px] h-auto mt-10 rounded-lg p-5 mx-auto">
              <div className="flex flex-col sm:flex-row items-center sm:items-start">
                <i>
                  <ICONS.HAMBURGER className="text-white text-[50px] sm:text-[80px]" />
                </i>
                <div className="sm:ml-7 mt-4 sm:mt-0 text-center sm:text-left">
                  <h2 className="text-[16px] sm:text-[18px] text-white">Download Our App</h2>
                  <p className="text-[10px] sm:text-[12px] text-gray-300 mt-2">
                    Loved by users for its simplicity and effectiveness.
                  </p>
                </div>
                <button className=" h-10 w-10 flex items-center justify-center mt-4 sm:mt-0 sm:ml-auto text-black rounded-full">
                  <i>
                    <ICONS.RIGHTARROW fontSize={15} />
                  </i>
                </button>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-5 mt-3">
                <div className="flex gap-16">
                  <h1 className="font-bold text-[16px] sm:text-[18px] text-white">200K</h1>
                  <h1 className="font-bold text-[16px] sm:text-[18px] text-white">132</h1>
                </div>
                <div className="flex gap-3 mt-3 sm:mt-0">
                  <div className="bg-white w-8 h-8 rounded-full overflow-hidden">
                    <img src={ft1} alt="" className="object-cover" />
                  </div>
                  <div className="bg-white w-8 h-8 rounded-full overflow-hidden">
                    <img src={ft2} alt="" className="object-cover" />
                  </div>
                  <div className="bg-white w-8 h-8 rounded-full overflow-hidden">
                    <img src={ft3} alt="" className="object-cover" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-8 mt-1">
                <p className="text-[10px] sm:text-[8px] text-gray-400">Loved by users for its simplicity and effectiveness.

                </p>
                <p className="text-[10px] sm:text-[8px] text-gray-400">Rated 5 stars by fitness enthusiasts worldwide.</p>
              </div>
            </div>
          </div>
          <div className="relative flex flex-col md:flex-row items-start">

            <img
              src={bg}
              alt=""
              className="mx-auto md:mr-96 mt-24 w-auto h-96 rounded-md"
            />
            <div className="absolute top-4 right-4 md:top-0 md:right-0 h-36 w-60 rounded-md">
              <div>
                <img
                  src={phone}
                  alt=""
                  className="h-40 object-contain mx-auto"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-black w-full sm:w-[80%] md:w-[1000px] h-auto rounded-full mt-7 mx-auto p-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 text-center gap-4">
            <p className="text-white text-lg sm:text-xl md:text-2xl font-bold font-serif">27</p>
            <p className="text-white text-lg sm:text-xl md:text-2xl font-bold font-serif">148</p>
            <p className="text-white text-lg sm:text-xl md:text-2xl font-bold font-serif">1000</p>
            <p className="text-white text-lg sm:text-xl md:text-2xl font-bold font-serif">120k+</p>
          </div>


          <div className="grid grid-cols-2 sm:grid-cols-4 text-center gap-4 mt-4">
            <p className="text-white text-[10px] sm:text-[12px] md:text-[14px] leading-tight">
              Top-rated fitness app with real user feedback.
            </p>
            <p className="text-white text-[10px] sm:text-[12px] md:text-[14px] leading-tight">
              Join thousands of satisfied users tracking their progress.
            </p>
            <p className="text-white text-[10px] sm:text-[12px] md:text-[14px] leading-tight">
              Our users trust us to help them reach their fitness goals.</p>
            <p className="text-white text-[10px] sm:text-[12px] md:text-[14px] leading-tight">
              Quick ratings to track your fitness success.</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;