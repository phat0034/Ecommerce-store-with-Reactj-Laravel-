import React, { useState, useEffect } from 'react'
import { assets } from '../../assets/assets'
import { useLocation,Link } from 'react-router-dom'
import Cookies from 'js-cookie'

function SideBar () {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL_API; // Lấy từ .env
  const locationRoute = useLocation()
  const token = Cookies.get('authToken')
  const sideBar = [
    { route_name: '/myprofile', title: 'Personal Info' },
    { route_name: '/myaddress', title: 'Delivery Address' },
    { route_name: '/myorder', title: 'My Orders' },
    { route_name: '/mywishlist', title: 'My Wishlist' },
    { route_name: '/myreview', title: 'My Review' }
  ]

  const [width, setWidth] = useState(window.innerWidth)
  const [isOpen, setIsOpen] = useState(true)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [dataFetch, setDataFetch] = useState({})
  const fetchUserInfor = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/getuser`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      if (data.success) {
        setDataFetch(data.data)
      } else {
        console.error(data.message)
      }
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    // Cập nhật kích thước màn hình khi resize
    const handleResize = () => setWidth(window.innerWidth)

    // Đảm bảo sidebar hiển thị khi màn hình rộng
    if (width >= 1023) setIsOpen(true)

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [width])

  useEffect(() => {
    // Cập nhật thời gian thực mỗi giây
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])
  useEffect(() => {
    fetchUserInfor()
  },[])
  if (!token) {
    window.location.href = '/'
  }

  return (
    <>
      {width < 1023 && (
        <div className='top-[50%] w-24 fixed'>
          <div
            className={`absolute top-[35%] pl-2 bg-black py-3 px-2 rounded-r-3xl cursor-pointer transition-all duration-300 ease-in-out ${
              isOpen ? 'hidden' : 'block'
            }`}
            onClick={() => setIsOpen(true)}
          >
            <img src={assets.rightarrow} alt='' className='w-5' />
          </div>
        </div>
      )}

      <div
        className={`bottom-0 md:relative md:w-64 bg-white shadow-2xl transition-all my-4 mx-6 rounded-2xl lg: md:z-[1] xs:z-[10] md:translate-x-0  md:my-4 md:mx-6 xs:fixed xs:w-screen xs:m-0 xs:h-screen  
          ${isOpen ? 'block' : 'hidden'}`}
      >
        {width < 1023 && (
          <div
            className={`absolute top-5 right-[-15%] pl-2 bg-black py-3 px-2 rounded-r-3xl cursor-pointer transition-all duration-300 ease-in-out ${
              width <= 320 ? 'hidden h-screen' : ''
            }`}
            onClick={() => setIsOpen(false)}
          >
            <img src={assets.leftarrow} alt='' className='w-5' />
          </div>
        )}

        <div className='flex items-center justify-between p-4 border-b rounded-b-3xl shadow-xl'>
          <div className='grid grid-cols-3 text-slate-700'>
            <div className='col-span-1 flex justify-center'>
              <img
                src='https://i.pravatar.cc/100'
                alt=''
                className='rounded-full w-[75%]'
              />
            </div>
            <div className='col-span-2'>
              <h1 className='text-[23px] text-center'>{dataFetch.name}</h1>
              <div className='flex gap-1 text-[15px] justify-center'>
                <img src={assets.clockicon} alt='' className='w-6' />
                {/* Hiển thị thời gian cập nhật theo thời gian thực */}
                <p className='my-auto'>{currentTime.toLocaleTimeString()}</p>
              </div>
            </div>
          </div>
          <button className='md:hidden p-2' onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? 'X' : <span className='text-2xl'>→</span>}
          </button>
        </div>

        <ul className='p-4 space-y-2'>
          {sideBar.map(item => (
            <li
              key={item.route_name}
              className={`flex items-center gap-2 p-2 rounded-lg bg-gray-200 hover:bg-white cursor-pointer hover:scale-105 hover:border hover:border-1 hover:shadow-xl transition delay-150 ${
                locationRoute.pathname === item.route_name &&
                'border border-1 shadow-xl scale-105 bg-white'
              }`}
            >
              <Link to={item.route_name}>{item.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default SideBar
