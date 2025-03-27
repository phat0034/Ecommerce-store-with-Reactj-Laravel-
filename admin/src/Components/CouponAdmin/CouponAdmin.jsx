import React, { useEffect, useState } from 'react'
import { assets } from '../../../../frontend/src/assets/assets'
import Popup from 'reactjs-popup'
import '../../App.css'
import { useNavigate, useSearchParams, useParams } from 'react-router-dom'

function CouponAdmin () {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL_API; // Lấy từ .env
  const API_BASE = import.meta.env.VITE_API_BASE_URL; // Lấy từ .env
  const [couponData, setCouponData] = useState([])
  const today = new Date().toISOString().split('T')[0]
  const [cpData, setCpData] = useState({
    code: '',
    discount: '0',
    quantity: '5',
    expires_at: today
  })
  const [formData, setFormData] = useState({
    code: '',
    discount: '0',
    quantity: '5',
    expires_at: ''
  })

  const clickHandlerData = item => {
    setCpData({ ...item })
  }
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleEditChange = e => {
    setCpData({ ...cpData, [e.target.name]: e.target.value })
  }

  const fetchData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/getcp`, {
        method: 'Get'
      })
      const fetchData = await response.json()
      if (fetchData.success) {
        setCouponData(fetchData.data)
      } else {
        console.error(fetchData.message)
      }
    } catch (error) {
      console.error(error)
    }
  }
  const addCoupon = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/addcp`, {
        method: 'Post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      const fetchData = await response.json()
      if (fetchData.success) {
        alert(fetchData.message)
        setFormData({
          code: '',
          discount: '0',
          quantity: '5',
          expires_at: ''
        })
        console.log(formData)
      } else {
        console.error(fetchData.message)
      }
    } catch (error) {
      console.error(error)
    }
  }
  const editCoupon = async id => {
    try {
      const formData = new FormData()
      formData.append('code', cpData.code)
      formData.append('discount', cpData.discount)
      formData.append('quantity', cpData.quantity)
      formData.append('expires_at', cpData.expires_at)
      const response = await fetch(
        `${API_BASE_URL}/editcp?id=${id}`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json'
          },
          body: formData
        }
      )
      const data = await response.json()

      // console.log(allProducts)
      if (data.success) {
        alert(data.message)
      } else {
        console.error(data.message, data.data)
      }
    } catch (error) {
      console.error('Lỗi khi gọi API:', error)
    }
  }
  const removeCoupon = async id => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/deletecp?id=${id}`,
        {
          method: 'DELETE'
        }
      )
      const data = await response.json()
      if (data.success) {
      } else {
        console.error(data.message)
      }
    } catch (error) {
      console.error('Lỗi APi: ', error)
    }
  }

  const findProduct = async value => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/findproduct?s=${value}`,
        {
          method: 'GET'
        }
      )
      const data = await res.json()
      if (data.success) {
        setAllProduct(data.data)
      }
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    fetchData()
  })
  return (
    <>
      <div className='flex-1 p-6'>
        <div className='bg-white p-6 rounded-lg shadow-lg'>
          <div className='grid grid-cols-2 my-2'>
            {/* SearchBar */}
            <div className='my-4'>
              {' '}
              <span>Search Product: </span>
              <input
                type='text'
                className='border shadow-md  focus:outline-none focus:border-blue-300 rounded-lg px-3'
                // value={query}
                // onChange={e => setQuery(e.target.value)}
              />
            </div>
            <div className='flex self-center justify-end '>
              <Popup
                trigger={
                  <button className='button border rounded-2xl py-3 px-6 me-6  justify-end before:ease relative h-12 w-40 overflow-hidden  border-gray-500 text-black shadow-2xl transition-all before:absolute before:top-1/2 before:h-0 before:w-64 before:origin-center before:-translate-x-20 before:rotate-45 before:bg-black before:duration-300 hover:text-white hover:shadow-black hover:before:h-64 hover:before:-translate-y-32'>
                    <p className='relative z-[2]'>Add Coupon</p>
                  </button>
                }
                modal
                nested
                contentStyle={{ width: '40%' }}
              >
                {close => (
                  <div className='modal'>
                    <button
                      className='text-[15px] font-bold absolute top-[-3%] right-[-15px] border bg-gray-300 text-red-500 rounded-full block px-[10px] py-[5px]  '
                      onClick={close}
                    >
                      X
                    </button>

                    <div className='content'>
                      <div className='max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg border border-gray-200 my-10 grid gap-5'>
                        <h2 className='text-2xl font-semibold mb-6 text-center text-gray-700'>
                          Create Coupon
                        </h2>

                        <div className=''>
                          <label className='block text-sm font-medium text-gray-600'>
                            Code
                          </label>
                          <input
                            type='text'
                            name='code'
                            value={formData.code}
                            onChange={handleChange}
                            className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none'
                            placeholder='Enter coupon code'
                            required
                          />
                        </div>
                        <div>
                          <label className='block text-sm font-medium text-gray-600'>
                            Discount (%)
                          </label>
                          <input
                            type='number'
                            name='discount'
                            value={formData.discount}
                            onChange={handleChange}
                            className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none'
                            placeholder='Enter discount percentage'
                            required
                            min={0}
                          />
                        </div>
                        <div>
                          <label className='block text-sm font-medium text-gray-600'>
                            Quantity
                          </label>
                          <input
                            type='number'
                            name='quantity'
                            value={formData.quantity}
                            onChange={handleChange}
                            className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none'
                            placeholder='Enter quantity'
                            required
                          />
                        </div>
                        <div>
                          <label className='block text-sm font-medium text-gray-600'>
                            Expires At
                          </label>
                          <input
                            type='date'
                            name='expires_at'
                            value={formData.expires_at}
                            onChange={handleChange}
                            min={today}
                            className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none'
                            required
                          />
                        </div>
                        <button
                          type='submit'
                          className='w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300'
                          onClick={() => addCoupon()}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </Popup>
            </div>
          </div>
          <div class='relative overflow-x-auto shadow-md sm:rounded-lg'>
            <table class='w-full text-sm text-left rtl:text-right text-gray-500 '>
              <thead class='text-xs text-gray-700 uppercase bg-gray-50 '>
                <tr>
                  <th scope='col' class='px-6 py-3'>
                    ID
                  </th>
                  <th scope='col' class='px-6 py-3'>
                    Coupon Code
                  </th>
                  <th scope='col' class='px-6 py-3'>
                    Discount
                  </th>
                  <th scope='col' class='px-6 py-3'>
                    Quantity
                  </th>
                  <th scope='col' class='px-6 py-3'>
                    Usage Limit
                  </th>
                  <th scope='col' class='px-6 py-3'>
                    Expire Date
                  </th>
                  <th scope='col' class='px-6 py-3'>
                    Create Date
                  </th>
                  <th scope='col' class='px-6 py-3'>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {couponData &&
                  couponData.map(cp => (
                    <>
                      <tr class='odd:bg-white even:bg-gray-50  border-b  border-gray-200'>
                        <td class='px-6 py-4 font-bold'>#{cp.id}</td>
                        <td class='px-6 py-4'>{cp.code}</td>
                        <td class='px-6 py-4'>{cp.discount} %</td>
                        <td class='px-6 py-4'>
                          <div className='flex'>
                            <p className=' '>{cp.quantity}</p>
                          </div>
                        </td>
                        <td class='px-6 py-4'>{cp.usage_limit}</td>
                        <td class='px-6 py-4'>{cp.expires_at}</td>
                        <td class='px-6 py-4'>{cp.created_at.split('T')[0]}</td>
                        <td class='px-6 py-4  h-full  '>
                          <div className='flex gap-2'>
                            <Popup
                              trigger={
                                <button className='button'>
                                  <div className=' cursor-pointer '>
                                    <img
                                      src={assets.editicon}
                                      alt=''
                                      className='w-5 color-red-500'
                                    />
                                  </div>
                                </button>
                              }
                              onOpen={() => clickHandlerData(cp)}
                              modal
                              nested
                              contentStyle={{ width: '40%' }}
                            >
                              {close => (
                                <div className='modal'>
                                  <button
                                    className='text-[15px] font-bold absolute top-[-3%] right-[-15px] border bg-gray-300 text-red-500 rounded-full block px-[10px] py-[5px]  '
                                    onClick={close}
                                  >
                                    X
                                  </button>

                                  <div className='content'>
                                    <div className='max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg border border-gray-200 my-10 grid gap-5'>
                                      <h2 className='text-2xl font-semibold mb-6 text-center text-gray-700'>
                                        Edit Coupon
                                      </h2>

                                      <div className=''>
                                        <label className='block text-sm font-medium text-gray-600'>
                                          Code
                                        </label>
                                        <input
                                          type='text'
                                          name='code'
                                          value={cpData.code}
                                          onChange={handleEditChange}
                                          className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none'
                                          placeholder='Enter coupon code'
                                          required
                                        />
                                      </div>
                                      <div>
                                        <label className='block text-sm font-medium text-gray-600'>
                                          Discount (%)
                                        </label>
                                        <input
                                          type='number'
                                          name='discount'
                                          value={cpData.discount}
                                          onChange={handleEditChange}
                                          className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none'
                                          placeholder='Enter discount percentage'
                                          required
                                          min={0}
                                        />
                                      </div>
                                      <div>
                                        <label className='block text-sm font-medium text-gray-600'>
                                          Quantity
                                        </label>
                                        <input
                                          type='number'
                                          name='quantity'
                                          value={cpData.quantity}
                                          onChange={handleEditChange}
                                          className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none'
                                          placeholder='Enter quantity'
                                          required
                                        />
                                      </div>
                                      <div>
                                        <label className='block text-sm font-medium text-gray-600'>
                                          Expires At
                                        </label>
                                        <input
                                          type='date'
                                          name='expires_at'
                                          value={cpData.expires_at}
                                          onChange={handleEditChange}
                                          min={today}
                                          className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none'
                                          required
                                        />
                                      </div>
                                      <button
                                        type='submit'
                                        className='w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300'
                                        onClick={() => (
                                          editCoupon(cp.id), close()
                                        )}
                                      >
                                        Edit
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </Popup>
                            <p
                              className='h-full cursor-pointer'
                              onClick={() => removeCoupon(cp.id)}
                            >
                              <img
                                src={assets.deleteicon}
                                alt=''
                                className='w-5'
                              />
                            </p>
                          </div>
                        </td>
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

export default CouponAdmin
