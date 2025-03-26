import React from 'react'
import { useState, useEffect } from 'react'
import { assets } from '../../assets/assets'
import { Routes, Route, useLocation } from 'react-router-dom'
import Cookies from 'js-cookie'
import SideBar from './SideBar'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
function MyProfile () {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL_API; // Lấy từ .env
  const [isOpen, setIsOpen] = useState(false)
  const token = Cookies.get('authToken')
  const [userData, setUserData] = useState({
    old_passw: '',
    new_pass: '',
    confirm_pass: ''
  })
  const [dataFetch, setDataFetch] = useState({})
  const [newData, setNewData] = useState([])
  const changeHandler = e => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }
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
  const changePass = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/changepass`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      })
      const data = await response.json()
      if (data.success) {
        setNewData(data)
        alert('Ur Password Has Changed!')
        Cookies.remove('authToken')
        Cookies.set('authToken', data.token, { expires: 1 })
        window.location.reload()
      } else {
        alert(data.message)
      }
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    fetchUserInfor()
  }, [])
  return (
    <>
      <div className='flex  bg-gray-100 '>
        {/* Sidebar */}
        <SideBar />
        {/* Content */}
        <div className='flex-1 p-6 md:p-6 xs:p-4'>
          <button
            className='md:hidden p-2 bg-gray-200 rounded-lg'
            onClick={() => setIsOpen(true)}
          ></button>
          <div className='bg-white p-6 rounded-lg shadow-lg md:p-6 xs:p-0'>
            <h1 className='text-xl font-semibold'>Profile Information</h1>
            <div className='mt-4  items-center gap-4 xl:py-12 xl:px-52 lg:py-6 lg:px-12 md:py-1 md:px-3 xs:px-4 xs:text-xs '>
              <div className='flex border-b'>
                <div className='flex justify-start w-full  py-6   '>
                  <span className='w-56 text-gray-500 lg:w-56 md:w-32 xs:w-32'>Email</span>
                  <p>{dataFetch.email}</p>
                </div>

                <p className='flex m-auto border-b border-black cursor-pointer'>
                  <span>Edit</span>
                </p>
              </div>
              <div className='flex border-b'>
                <div className='flex justify-start w-full  py-6 md:py-6   '>
                  <span className='w-56 text-gray-500 lg:w-56 md:w-32 xs:w-32'>Username</span>
                  <p>{dataFetch.name}</p>
                </div>

                <p className='flex m-auto border-b border-black cursor-pointer'>
                  <span>Edit</span>
                </p>
              </div>
              <div className='flex border-b'>
                <div className='flex justify-start w-full  py-6  '>
                  <span className='w-56 text-gray-500 lg:w-56 md:w-32 xs:w-32'>Password</span>
                  <p></p>
                </div>

                <p className='flex m-auto border-b border-black cursor-pointer'>
                  <Popup
                    trigger={<button className='button'> Edit </button>}
                    modal
                    nested
                    contentStyle={{ width: '30%' }}
                  >
                    {close => (
                      <div className='modal p-6  relative  '>
                        <button
                          className='text-[15px] font-bold absolute top-[-15%] right-[-15px] border bg-gray-300 text-red-500 rounded-full block px-[10px] py-[5px]  '
                          onClick={close}
                        >
                          X
                        </button>
                        <h1 className='header text-2xl mb-3 '>
                          {' '}
                          Change Password{' '}
                        </h1>
                        <div className='content my- '>
                          <div className='grid grid-cols-3 my-4 '>
                            <p className='my-auto'>Old Password</p>
                            <input
                              name='old_passw'
                              value={userData.old_passw}
                              type='password'
                              onChange={changeHandler}
                              className=' col-span-2  border border-gray-400 px-3 py-1 focus:border-blue-400 focus:outline-none rounded-md shadow-lg '
                            />
                          </div>
                          <div className='grid grid-cols-3  my-4'>
                            <p className='my-auto'>New Password</p>
                            <input
                              name='new_pass'
                              value={userData.new_pass}
                              type='password'
                              onChange={changeHandler}
                              className=' col-span-2  border border-gray-400 px-3 py-1 focus:border-blue-400 focus:outline-none rounded-md shadow-lg '
                            />
                          </div>{' '}
                          <div className='grid grid-cols-3 my-4 '>
                            <p className='my-auto'>Confirm New Password</p>
                            <input
                              name='confirm_pass'
                              value={userData.confirm_pass}
                              type='password'
                              onChange={changeHandler}
                              className=' col-span-2  border border-gray-400 px-3 py-1 focus:border-blue-400 focus:outline-none rounded-md shadow-lg '
                            />
                          </div>
                        </div>

                        <div className='actions flex justify-end'>
                          <button
                            className=' border rounded-md px-6 py-2 hover:bg-green-400 hover:text-white'
                            onClick={() => changePass()}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    )}
                  </Popup>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MyProfile
