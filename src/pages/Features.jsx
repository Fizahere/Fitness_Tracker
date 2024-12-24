import React from 'react'
import ICONS from '../assets/constants/icons'

const Features = () => {
    const tabsData = [
        {
          icon: <ICONS.CLOCK />,
          heading: "Tracking",
          description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi sunt perferendis ut repellendus esse quidem aperiam asperiores obcaecati ullam veritatis!"
        },
        {
          icon: <ICONS.CHART1 />,
          heading: "Insight",
          description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi sunt perferendis ut repellendus esse quidem aperiam asperiores obcaecati ullam veritatis!"
        },
        {
          icon: <ICONS.FIRE />,
          heading: "Real Time",
          description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi sunt perferendis ut repellendus esse quidem aperiam asperiores obcaecati ullam veritatis!"
        },
      ]
    
  return (
    <section className="px-10 py-10 h-auto bg-white text-black" id="features">
        <div className="md:flex items-center mt-20">
          <div className="w-full md:w-1/2 font-serif">
            <p className="text-2xl lg:text-5xl font-bold">Best Features</p>
            <p className="text-2xl lg:text-5xl font-bold">We Offer For You</p>
          </div>
          <div className="w-full md:w-1/2 font-thin">
            <p className="text-zinc-700 mt-4 lg:text-sm text-xs">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi sunt perferendis ut repellendus esse quidem aperiam asperiores obcaecati ullam veritatis!
              <div className="flex space-x-3 justify-end">

                <div className="w-8 h-8 border-2 border-black rounded-full flex items-center justify-center mt-4">
                  <i ><ICONS.LEFTARROWN fontSize={12} /></i>
                </div>
                <div className="w-12 h-12 border-2  border-black rounded-full flex items-center justify-center mt-2">
                  <div className="w-8 h-8 border-2 border-lime-300  bg-lime-300 text-black rounded-full flex items-center justify-center ">
                    <i>
                      <ICONS.RIGHTARROW fontSize={14} />
                    </i>
                  </div>

                </div>
              </div>
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
          {tabsData.map((tab, index) => (
            <div
              key={index}
              className="bg-black px-6 sm:px-8 py-10 sm:py-14 rounded-3xl mr-0 sm:mr-2 text-zinc-400 hover:text-lime-300 mt-2 transition-all duration-300"
            >
              <i className="flex justify-end text-3xl sm:text-4xl">{tab.icon}</i>
              <h3 className="text-white text-2xl sm:text-3xl font-bold my-4">{tab.heading}</h3>
              <p className="text-xs sm:text-sm md:text-base">{tab.description}</p>
            </div>
          ))}
        </div>
    </section>
  )
}

export default Features
