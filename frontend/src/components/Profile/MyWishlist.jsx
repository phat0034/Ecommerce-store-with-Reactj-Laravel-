import React, { useEffect } from 'react'
import { useState } from 'react'
import { assets } from '../../assets/assets'
import { Routes, Route, useLocation } from 'react-router-dom'
import Cookies from 'js-cookie'
import SideBar from './SideBar'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import Empty from '../Emptypage/Emptypage'
function MyWishlist () {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL_API; // Lấy từ .env
  const API_BASE = import.meta.env.VITE_API_BASE_URL_API; // Lấy từ .env
  const token = Cookies.get('authToken')
  const [dataWL, setDataWL] = useState([])
  const [dataCart, setdataCart] = useState({})
  const changeQuantity = (id, quantity) => {
    setdataCart({ ...dataCart, [id]: quantity })
  }
  const getWishList = async () => {
    const res = await fetch(`${API_BASE_URL}/getwl`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      method: 'GET'
    })

    const data = await res.json()
    if (data.success) {
      setDataWL(data.data)
    } else {
      console.error(data.message)
    }
  }
  const addtoCart = async (id, quantity) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/addcart?idproduct=${id}&quantity=${quantity}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            accept: 'application/json'
          },
          body: JSON.stringify(dataCart)
        }
      )
      const data = await response.json()
    } catch (error) {
      console.error(error)
    }
  }
  const deleteWL = async id => {
    const res = await fetch(
      `${API_BASE_URL}/removewl?id_wishlist=${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        method: 'Delete'
      }
    )

    const data = await res.json()
    if (data.success) {
      setDataWL(data.data)
    } else {
      console.error(data.message)
    }
  }
  useEffect(() => {
    getWishList()
  })

  return (
    <>
      <div className='flex  bg-gray-100 '>
        {/* Sidebar */}
        <SideBar />
        {/* idk */}
        <>
          {' '}
          {/* <div
          className={`fixed md:relative w-64 bg-white shadow-2xl transition-all my-4 mx-6 rounded-2xl  ${
            isOpen ? 'translate-x-0' : '-translate-x-64'
          } md:translate-x-0 z-50`}
        >
          <div className='flex items-center justify-between p-4 border-b rounded-b-3xl shadow-xl'>
            <div className='grid grid-cols-3  text-slate-700 '>
              <div className='col-span-1 flex justify-center'>
                <img
                  src='https://i.pravatar.cc/100'
                  alt=''
                  className='rounded-full w-[75%]'
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
          <ul className='p-4 space-y-3'>
            <li className='flex items-center gap-2 p-2 rounded-lg hover:bg-gray-200 cursor-pointer'>
              Personal Info
            </li>
            <li className='flex items-center gap-2 p-2 rounded-lg hover:bg-gray-200 cursor-pointer'>
              Delevery Address
            </li>
            <li className='flex items-center gap-2 p-2 rounded-lg hover:bg-gray-200 cursor-pointer'>
              My Orders
            </li>
            <li className='flex items-center gap-2 p-2 rounded-lg hover:bg-gray-200 cursor-pointer'>
              My Wishlist
            </li>
          </ul>
        </div> */}
        </>
        {/* Content */}
        <div className='flex-1 p-6'>
          <div className='bg-white p-6 rounded-lg shadow-lg'>
            {dataWL.length === 0 ? (
              <Empty/>
            ) : (
              <div className='grid grid-cols-4 gap-10 xl:grid-cols-4 lg:grid-cols-2 xs:grid-cols-1'>
                {dataWL.length === 0 ? (
                  <>
                    <div
                      role='status '
                      className='flex justify-center h-[60vh] col-start-2 col-span-2  '
                    >
                      <svg
                        aria-hidden='true'
                        class='inline  text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300 m-auto  w-24 h-24'
                        viewBox='0 0 100 101'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                          fill='currentColor'
                        />
                        <path
                          d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                          fill='currentFill'
                        />
                      </svg>
                      <span class='sr-only'>Loading...</span>
                    </div>
                  </>
                ) : (
                  dataWL.map((wl, key) => {
                    return (
                      <>
                        <div
                          className='border rounded-xl grid h-[475px] shadow-2xl relative group'
                          key={key}
                        >
                          <p className='absolute  bg-black text-white w-10 h-10 rounded-full hidden border top-[-3%] right-[-3%] group-hover:flex  group-hover:items-center cursor-pointer'>
                            <span
                              onClick={() => deleteWL(wl.id)}
                              className='m-auto translate-y-[-10%] text-2xl'
                            >
                              x
                            </span>
                          </p>
                          <h1 className='m-auto text-xl font-normal'>
                            {wl.namepd}
                          </h1>
                          <img
                            src={`${API_BASE}/storage/${wl.img}`}
                            alt=''
                            className='w-36 m-auto'
                          />
                          <p className='m-auto text-2xl font-semibold mb-12'>
                            ${wl.saleprice > 0 ? wl.saleprice : wl.price}
                          </p>
                          <input
                            type='number'
                            min={1}
                            value={dataCart[wl.id] || 1}
                            onChange={e => {
                              changeQuantity(wl.id, parseInt(e.target.value))
                            }}
                            className='border rounded-lg m-auto py-2 px-3 w-[50%] flex'
                          />
                          <button
                            className='mb-8 border rounded-2xl w-[50%] m-auto px-3 py-3 bg-black text-white'
                            onClick={() => addtoCart(wl.id, dataCart[wl.id])}
                          >
                            Add to cart
                          </button>
                        </div>
                      </>
                    )
                  })
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default MyWishlist
