import React, { useEffect, useState, useRef } from 'react'
import { assets } from '../../assets/assets'
import { useParams } from 'react-router'

import Cookies from 'js-cookie'
function CheckOut () {
  const { id } = useParams()
  const temp_id = localStorage.getItem('temp_order')
  if (!temp_id || temp_id !== id) {
    window.location.href = '/'
  }
  return (
    <>
      <div className='checkOutPage p-32 grid justify-center text-center'>
        <div className='icon  flex justify-center '>
          <img src={assets.checkout} alt='' className='w-40' />
        </div>
        <div className='text-center text-2xl font-bold my-3'>
          <h1 className='text-2xl font-bold text-gray-800'>
            Thank You for Your Order!
          </h1>
          <p className='text-gray-600 mt-2'>
            We appreciate your purchase and are preparing your order.
          </p>
        </div>
        <p className='text-gray-700 font-semibold mt-4'>
          Your Order ID: <span className='text-blue-600'>#{id}</span>
        </p>
        <div className='mt-6 flex gap-3 justify-center'>
          <button
            className='relative overflow-hidden border-2 border-yellow-300 rounded-2xl p-4 text-yellow-700 font-semibold transition-all 
      before:absolute before:top-0 before:left-0 before:w-0 before:h-full before:bg-yellow-300 
      before:transition-all before:duration-300 hover:before:w-full hover:text-white
      before:z-0 z-10'
            onClick={() => (
              localStorage.removeItem('temp_order'),
              (window.location.href = `/`)
            )}
          >
            <span className='relative z-10'>Continue Shopping</span>
          </button>

          <button
            className='relative overflow-hidden border-2 border-blue-300 rounded-2xl p-4 text-blue-700 font-semibold transition-all 
      before:absolute before:top-0 before:left-0 before:w-0 before:h-full before:bg-blue-300 
      before:transition-all before:duration-300 hover:before:w-full hover:text-white
      before:z-0 z-10'
            onClick={() => (
              localStorage.removeItem('temp_order'),
              (window.location.href = `/myorder`)
            )}
          >
            <span className='relative z-10'>Track Your Order</span>
          </button>
        </div>
      </div>
    </>
  )
}

export default CheckOut
