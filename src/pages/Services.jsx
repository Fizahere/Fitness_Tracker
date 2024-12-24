import React from 'react'
import ICONS from '../assets/constants/icons'
import ft1 from '../assets/images/ft1.png'
import head from '../assets/images/head.png'
import head2 from '../assets/images/head2.png'

const Services = () => {
  const tabsData = [
    {
      image: ft1,
      icon: <ICONS.CLOCK />,
      heading: "Tracking",
      description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi sunt perferendis ut repellendus esse quidem aperiam asperiores obcaecati ullam veritatis!"
    },
    {
      image: head,
      icon: <ICONS.CHART1 />,
      heading: "Insight",
      description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi sunt perferendis ut repellendus esse quidem aperiam asperiores obcaecati ullam veritatis!"
    },
    {
      image: head2,
      icon: <ICONS.FIRE />,
      heading: "Real Time",
      description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi sunt perferendis ut repellendus esse quidem aperiam asperiores obcaecati ullam veritatis!"
    },
  ]
  
  return (
    <>
      <section className='px-10 py-10 h-auto bg-white text-black' id='services'>
        {/* feactures */}
        <div className="md:flex items-center mt-5">
          <div className="w-full md:w-1/2 font-serif">
            <p className="text-[20px] sm:text-[40px] font-bold">Catalog Our Service</p>
            <p className="text-[20px] sm:text-[40px] font-bold">Through Our App</p>
          </div>
          <div className="w-full md:w-1/2">
            <p className=" text-[10px] sm:text-[12px]  mt-4 font-thin">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi sunt perferendis ut repellendus esse quidem aperiam asperiores obcaecati ullam veritatis!
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi sunt perferendis ut repellendus esse quidem aperiam asperiores obcaecati ullam veritatis!
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-14 gap-5">
          {tabsData.map((tab) => (
            <div className='mr-2 mt-2 '>
            <img src={tab.image} alt="" className='rounded-3xl h-80 ' />
           <div className="p-3">
           <div className="flex justify-between items-center">
             <h3 className='text-black text-2xl font-bold my-5 font-serif'>{tab.heading}</h3>
             <i className='text-lg bg-lime-300 rounded-full p-4'>{tab.icon}</i>
             </div>
              <p className=' text-[10px] sm-text-[12px]'>{tab.description}</p>
           </div>
            </div>
          ))}
        </div>


  
{/* features */}
      </section>
    </>
  )
}

export default Services