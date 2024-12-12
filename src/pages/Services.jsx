import React from 'react'
import ICONS from '../assets/constants/icons'

const Services = () => {
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
    <>
      <section className='px-10 py-20 bg-white text-black' id='services'>
        <div className="md:flex items-center">
          <div className="w-full md:w-1/2">
            <p className="text-4xl lg:text-7xl font-bold">Best Features</p>
            <p className="text-4xl lg:text-7xl font-bold">We Offer For You</p>
          </div>
          <div className="w-full md:w-1/2">
            <p className="text-zinc-700 mt-4 lg:text-lg text-xs">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi sunt perferendis ut repellendus esse quidem aperiam asperiores obcaecati ullam veritatis!
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-14">
          {tabsData.map((tab,index) => (
            <div key={index} className='bg-black px-8 py-14 rounded-3xl mr-2 text-zinc-400 hover:text-lime-300 mt-2 hover:py-10'>
              <i className='flex justify-end text-5xl'>{tab.icon}</i>
              <h3 className='text-white text-4xl font-bold my-5'>{tab.heading}</h3>
              <p>{tab.description}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default Services