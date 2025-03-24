import React from 'react'
import { assets } from '../../assets/assets'
function PolicyPage () {
  return (
    <div>
      <div className='grid grid-cols-12 xs:grid-cols-1 md:grid-cols-12'>
        <div className=' lg:col-end-5 lg:col-span-2  text-center  md:col-start-1 md:col-span-3 '>
          <div className=' w-auto flex justify-center items-center    '>
            <img
              src={assets.delivery}
              alt=''
              className='w-20 rounded-full border p-3 my-5 bg-black '
            />
          </div>
          <h1 className='font-semibold text-xl md:text-[15px]'>
            FREE AND FAST DELIVERY
          </h1>
          <p className='text-l md:text-sm '>
            Free delivery for all orders over $140
          </p>
        </div>
        <div className='lg:col-span-4  text-center  md:col-start-5 md:col-span-4  '>
          <div className=' w-auto flex justify-center items-center   '>
            <img
              src={assets.support}
              alt=''
              className='w-20 rounded-full border p-3 my-5 bg-black '
            />
          </div>
          <h1 className='font-semibold text-xl md:text-[15px]'>
            24/7 CUSTOMER SERVICE
          </h1>
          <p className='text-l md:text-sm'>Friendly 24/7 customer support</p>
        </div>
        <div className='lg:col-start-9 lg:col-span-2  text-center md:col-start-10 md:col-span-3   '>
          <div className=' w-auto flex justify-center items-center    '>
            <img
              src={assets.safety}
              alt=''
              className='w-20 rounded-full border p-3 my-5 bg-black '
            />
          </div>
          <h1 className='font-semibold text-xl  md:text-[14px]'>
            MONEY BACK GUARANTEE
          </h1>
          <p className='text-lg md:text-[13px]  '>
            We reurn money within 30 days
          </p>
        </div>
      </div>
    </div>
  )
}

export default PolicyPage
