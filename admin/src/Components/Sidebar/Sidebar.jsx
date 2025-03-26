import React from 'react'
import { assets } from '../../../../frontend/src/assets/assets'
import { Routes, Route, useLocation } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
function SideBar () {
  const locationRoute = useLocation()

  const sideBar = [
    
    { route_name: '/dashboard', title: 'Dashboard' },
    { route_name: '/addproduct', title: 'Add Product' },
    { route_name: '/listproduct', title: 'Product Manager' },
    { route_name: '/usercontrol', title: 'User Manager' },
    { route_name: '/ordercontrol', title: 'Order Manager' },
    { route_name: '/reviewcontrol', title: 'Review Manager' },
    { route_name: '/coupon', title: 'Coupon Manager' }
  ]
  const [time, setTime] = useState(new Date())

  return (
    <div
      className={`fixed md:relative w-64 bg-white shadow-2xl transition-all my-4 mx-6 rounded-2xl  md:translate-x-0 z-50`}
    >
      <div className='flex items-center justify-between p-4 border-b rounded-b-3xl shadow-xl'>
        <div className='grid grid-cols-3  text-slate-700 '>
          <div className='col-span-1 flex justify-center '>
            <img
              src='https://i.pravatar.cc/100'
              alt=''
              className='rounded-full '
            />
          </div>
          <div className='col-span-2 '>
            <h1 className='text-[23px] text-center '>John Doe</h1>
            <div className='flex gap-1 text-[15px] justify-center'>
              <img src={assets.clockicon} alt='' className='w-6' />
              <p className='my-auto'>03:00:00AM</p>
            </div>
          </div>
        </div>
        <button className='md:hidden p-2' onClick={() => setIsOpen(false)}>
          X
        </button>
      </div>
      <ul className='p-4 space-y-2 '>
        {sideBar.map(item => (
          <li
            className={`flex items-center gap-2 p-2 rounded-lg bg-gray-200 hover:bg-white cursor-pointer hover:scale-105 hover:border hover:border-1 hover:shadow-xl transition delay-150 ${
              locationRoute.pathname === item.route_name &&
              'border border-1  shadow-xl scale-105 bg-white'
            }`}
          >
            <Link to={item.route_name}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SideBar
