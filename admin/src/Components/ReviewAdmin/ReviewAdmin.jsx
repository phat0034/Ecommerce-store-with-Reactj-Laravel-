import React, { useEffect, useState } from 'react'
import { assets } from '../../../../frontend/src/assets/assets'
import Popup from 'reactjs-popup'
import '../../App.css'
import { useNavigate, useSearchParams, useParams } from 'react-router-dom'
function ReviewAdmin () {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL_API; // Lấy từ .env
  const API_BASE = import.meta.env.VITE_API_BASE_URL; // Lấy từ .env
  const [dataReview, setDataReview] = useState([])
  const [query, setQuery] = useState('')
  const findReview = async value => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/findreview?s=${value}`,
        {
          method: 'GET'
        }
      )
      const data = await res.json()
      if (data.success) {
        setDataReview(data.data)
      }else{
        console.warn(data.message);
        
      }
    } catch (error) {
      console.error(error)
    }
  }
  const fetchDataReview = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/getallreview`, {
        method: 'GET'
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
    if (query.trim() !== '') {
      findReview(query)
    } else {
      fetchDataReview()
    }
  }, [query])
  return (
    <>
      <div className='flex-1 p-6'>
        <div className='bg-white p-6 rounded-lg shadow-lg'>
          <div className='my-4'>
            {' '}
            <span>Search User: </span>
            <input
              type='text'
              className='border shadow-md  focus:outline-none focus:border-blue-300 rounded-lg px-3'
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
          </div>
          <div class='relative overflow-x-auto shadow-md sm:rounded-lg'>
            <table class='w-full text-sm text-left rtl:text-right text-gray-500 '>
              <thead class='text-xs text-gray-700 uppercase bg-gray-50 '>
                <tr>
                  <th scope='col' class='px-6 py-3'>
                    ID
                  </th>
                  <th scope='col' class='px-6 py-3'>
                    Product
                  </th>
                  <th scope='col' class='px-6 py-3'>
                    Rating
                  </th>
                  <th scope='col' class='px-6 py-3'>
                    Review
                  </th>
                  <th scope='col' class='px-6 py-3'>
                    Date Review
                  </th>
                  <th scope='col' class='px-6 py-3'>
                    Username Reviewer
                  </th>
                  <th scope='col' class='px-6 py-3'>
                    Email Reviewer
                  </th>
                </tr>
              </thead>
              <tbody>
                {dataReview &&
                  dataReview.map(item => (
                    <>
                      <tr class='odd:bg-white even:bg-gray-50  border-b  border-gray-200'>
                        <th
                          scope='row'
                          class='px-6 py-4 font-medium text-gray-900 whitespace-nowrap '
                        >
                          #{item.id}
                        </th>
                        <td class=''>
                          <th
                            scope='row'
                            class='px-6 py-4 font-medium text-gray-900 whitespace-nowrap '
                          >
                            <div className='flex'>
                              <div className='w-12'>
                                <img
                                  src={`${API_BASE}/storage/${item.img}`}
                                  alt=''
                                />
                              </div>
                              <div className='grid  '>
                                <h1 className='my-auto'>{item.namepd}</h1>
                                <p>Type: {item.typename}</p>
                              </div>
                            </div>
                          </th>
                        </td>
                        <td class='px-6 py-4'>
                          <div className='flex gap-2'>
                            <p>{item.rating}</p>
                            <img src={assets.star} alt='' className='w-4' />
                          </div>
                        </td>
                        <td class='px-6 py-4 max-w-[400px]'>{item.review}</td>
                        <td class='px-6 py-4'>{item.created_at}</td>
                        <td class='px-6 py-4'>{item.username}</td>
                        <td class='px-6 py-4'>{item.email}</td>
                      </tr>
                    </>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default ReviewAdmin
