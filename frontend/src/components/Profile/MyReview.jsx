import React, { useEffect } from 'react'
import { useState } from 'react'
import { assets } from '../../assets/assets'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Rating } from 'react-simple-star-rating'
import Cookies from 'js-cookie'
import SideBar from './SideBar'
import Popup from 'reactjs-popup'
import Empty from '../Emptypage/Emptypage'
import 'reactjs-popup/dist/index.css'
function MyOrder () {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL_API; // Lấy từ .env
  const API_BASE = import.meta.env.VITE_API_BASE_URL; // Lấy từ .env
  const token = Cookies.get('authToken')
  const [dataReview, setDataReview] = useState([])

  const fetchDataReview = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/getreview`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      const data = await res.json()
      if (data.success) {
        setDataReview(data.data)
      } else {
        console.warn(data.message)
      }
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    console.log(dataReview)

    fetchDataReview()
  }, [])
  return (
    <>
      <div className='flex  bg-gray-100 '>
        {/* Sidebar */}
        <SideBar />
        {/* Content */}
        <div className='flex-1 p-6'>
          <>
            {' '}
            <div className='bg-white p-6 rounded-lg shadow-lg'>
              {dataReview.length === 0 ? (
                <Empty />
              ) : (
                <div class='relative overflow-x-auto shadow-md sm:rounded-lg'>
                  <table class='w-full text-sm text-left rtl:text-right text-gray-500 '>
                    <thead class='text-xs text-gray-700 uppercase bg-gray-50 '>
                      <tr>
                        <th scope='col' class='px-6 py-3'>
                          Product
                        </th>
                        <th scope='col' class='px-6 py-3 '>
                          <p className='pl-5'>Rating</p>
                        </th>
                        <th scope='col' class='px-6 py-3'>
                          Review
                        </th>
                        <th scope='col' class='px-6 py-3'>
                          Date
                        </th>

                        <th scope='col' class='px-6 py-3'>
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataReview &&
                        dataReview.map(datarv => (
                          <>
                            <tr class='odd:bg-white even:bg-gray-50  border-b  border-gray-200'>
                              <th
                                scope='row'
                                class='px-6 py-4 font-medium text-gray-900 whitespace-nowrap '
                              >
                                <div className='flex'>
                                  <div className='w-12'>
                                    <img
                                      src={`${API_BASE}/storage/${datarv.img}`}
                                      alt=''
                                    />
                                  </div>
                                  <div className='grid  '>
                                    <h1 className='my-auto'>{datarv.namepd}</h1>
                                    <p>Type: {datarv.name}</p>
                                  </div>
                                </div>
                              </th>
                              <td class='px-6 py-4'>
                                <div
                                  style={{
                                    direction: 'ltr',
                                    fontFamily: 'sans-serif',
                                    touchAction: 'none'
                                  }}
                                >
                                  <Rating
                                    SVGclassName={'inline-block'}
                                    initialValue={datarv.rating}
                                    size={20}
                                    readonly
                                  />
                                </div>
                              </td>
                              <td class='px-6 py-4 max-w-[350px]'>
                                {datarv.review}
                              </td>
                              <td class='px-6 py-4'>
                                {datarv.created_at.split(' ')[0]}
                              </td>
                              <td class='px-6 py-4'>Hi</td>
                            </tr>
                          </>
                        ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        </div>
      </div>
    </>
  )
}

export default MyOrder
