import React from 'react'
import ICONS from '../assets/constants/icons'
import image from '../assets/images/mainImage.jpg'

const About = () => {
  const tabsData = [
    {
      image: image,
      icon: <ICONS.CLOCK />,
      heading: "Tracking",
      description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi sunt perferendis ut repellendus esse quidem aperiam asperiores obcaecati ullam veritatis!"
    },
    {
      image: image,
      icon: <ICONS.CHART1 />,
      heading: "Insight",
      description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi sunt perferendis ut repellendus esse quidem aperiam asperiores obcaecati ullam veritatis!"
    },
    {
      image: image,
      icon: <ICONS.FIRE />,
      heading: "Real Time",
      description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi sunt perferendis ut repellendus esse quidem aperiam asperiores obcaecati ullam veritatis!"
    },
  ]
  return (
    <>
      <section className='px-10 py-10 bg-white text-black' id='about'>
        <div className="md:flex items-center">
          <div className="w-full md:w-1/2">
            <p className="text-4xl lg:text-7xl font-bold">Catalog Of Service</p>
            <p className="text-4xl lg:text-7xl font-bold">Through Our App</p>
          </div>
          <div className="w-full md:w-1/2">
            <p className="text-zinc-700 lg:text-lg text-xs mt-4">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi sunt perferendis ut repellendus esse quidem aperiam asperiores obcaecati ullam veritatis!
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi sunt perferendis ut repellendus esse quidem aperiam asperiores obcaecati ullam veritatis!
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-14">
          {tabsData.map((tab,index) => (
            <div key={index} className='mr-2 mt-2'>
            <img src={tab.image} alt="" className='rounded-3xl h-80' />
           <div className="p-3">
           <div className="flex justify-between items-center">
             <h3 className='text-black text-4xl font-bold my-5'>{tab.heading}</h3>
             <i className='text-lg bg-lime-300 rounded-full p-4 hover:text-xl'>{tab.icon}</i>
             </div>
              <p className='text-zinc-700'>{tab.description}</p>
           </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default About