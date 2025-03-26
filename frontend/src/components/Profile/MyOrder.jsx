import React, { useEffect } from 'react'
import { useState } from 'react'
import { assets } from '../../assets/assets'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Rating } from 'react-simple-star-rating'
import Cookies from 'js-cookie'
import SideBar from './SideBar'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'

import Empty from '../Emptypage/Emptypage'
function MyOrder () {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL_API; // Lấy từ .env
  const token = Cookies.get('authToken')
  const [orderData, setOrderData] = useState([])
  const [detailOrder, setDetailOrder] = useState([])
  const [formReview, setFormReview] = useState({
    rating: 0,
    feedback: ''
  })
  const [isReview, setIsReview] = useState(false)
  const [dataReview, setDataReview] = useState(false)
  const colorStatus = [
    { name: 'pending', color: 'bg-orange-500' },
    { name: 'processing', color: 'bg-blue-500' },
    { name: 'shipped', color: 'bg-teal-500' },
    { name: 'delivered', color: 'bg-green-500' },
    { name: 'cancelled', color: 'bg-red-500' }
  ]
  // Catch Rating value
  const handleRating = rate => {
    setFormReview({ ...formReview, rating: rate })
  }
  const fetchOrder = async () => {
    const res = await fetch('${API_BASE_URL}/getorder', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      method: 'GET'
    })

    const data = await res.json()
    if (data.success) {
      setOrderData(data.data)
    } else {
      console.warn(data.message)
    }
  }
  const addReview = async idpd => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/addreview?id_product=${idpd}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify(formReview)
        }
      )

      const data = await res.json()
      if (data.success) {
        data.isReview ? alert(data.message) : alert(data.message)
        setDetailOrder(data.message)
      } else {
        console.warn(data.message)
      }
    } catch (error) {
      console.error(error)
    }
    window.location.href = '/myorder'
  }
  const checkReview = async idpd => {
    setIsReview(false)

    try {
      const res = await fetch(
        `${API_BASE_URL}/checkreview?id_product=${idpd}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      )

      const data = await res.json()
      if (data.isReview) {
        setIsReview(true)
        setDataReview([data.data])
        console.log(dataReview)
      } else {
        console.warn(data.message)
      }
    } catch (error) {
      console.error(error)
    }
  }
  const fetchDetailOrder = async id => {
    setDetailOrder(null)
    const res = await fetch(
      `${API_BASE_URL}/getdetailorder?id_order=${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        method: 'GET'
      }
    )

    const data = await res.json()
    if (data.success) {
      setDetailOrder(data.data)
    } else {
      console.warn(data.message)
    }
  }

  useEffect(() => {
    fetchOrder()
  }, [])
  return (
    <>
      <div className='flex  bg-gray-100 '>
        {/* Sidebar */}
        <SideBar />
        {/* Content */}
        <div className='flex-1 p-6 lg:p-6 md:p-3'>
          {orderData.length === 0 ? (
            <Empty />
          ) : (
            <>
              <div className='bg-white p-6 rounded-lg shadow-lg lg:p-6 md:p-2'>
                <div class='relative overflow-x-auto shadow-md sm:rounded-lg'>
                  <table class='w-full text-sm text-left rtl:text-right text-gray-500 '>
                    <thead class='text-xs text-gray-700 uppercase bg-gray-50 '>
                      <tr>
                        <th scope='col' class='px-6 py-3'>
                          ID
                        </th>
                        <th scope='col' class='px-6 py-3'>
                          Subtotal
                        </th>
                        <th scope='col' class='px-6 py-3'>
                          Order Date
                        </th>
                        <th scope='col' class='px-6 py-3'>
                          Status
                        </th>
                        <th scope='col' class='px-6 py-3'>
                          Ship To
                        </th>
                        <th scope='col' class='px-6 py-3'>
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderData.map((order, key) => (
                        <>
                          <tr
                            class='odd:bg-white even:bg-gray-50  border-b  border-gray-200'
                            key={key}
                          >
                            <th
                              scope='row'
                              class='px-6 py-4 font-medium text-gray-900 whitespace-nowrap '
                            >
                              #{order.id}
                            </th>
                            <td class='px-6 py-4'>${order.totalprice}</td>
                            <td class='px-6 py-4'>
                              {order.created_at.split('T')[0]}
                            </td>
                            <td class='px-6 py-4'>
                              <div className='flex'>
                                <p
                                  className={`border px-2 py-1 rounded-3xl    text-white  capitalize ${
                                    colorStatus.find(
                                      color => color.name === order.status
                                    ).color
                                  }`}
                                >
                                  {order.status}
                                </p>
                              </div>
                            </td>
                            <td class='px-6 py-4'>{order.name_order}</td>
                            <td class='px-6 py-4'>
                              <Popup
                                trigger={
                                  <button className='button'>
                                    <div className='ml-3 cursor-pointer '>
                                      <img
                                        src={assets.eyeicon}
                                        alt=''
                                        className='w-5'
                                      />
                                    </div>
                                  </button>
                                }
                                onOpen={() =>
                                  fetchDetailOrder(parseInt(order.id))
                                }
                                modal
                                nested
                                contentStyle={{
                                  width: '60%'

                                  // overflowY: 'auto',
                                  // overflowX: 'hidden'
                                }}
                              >
                                {close &&
                                  (detailOrder === null ? (
                                    <div
                                      role='status '
                                      className='flex justify-center h-[60vh]  '
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
                                  ) : (
                                    <div className='modal p-6  relative  '>
                                      <button
                                        className='text-[15px] font-bold absolute top-[-3%] right-[-15px] border bg-gray-300 text-red-500 rounded-full block px-[10px] py-[5px]  '
                                        onClick={close}
                                      >
                                        X
                                      </button>
                                      <h1 className='header text-2xl mb-3 '>
                                        Order #{order.id}
                                      </h1>
                                      <div className='content max-h-[60vh] overflow-y-auto '>
                                        <table class='w-full text-sm text-left rtl:text-right text-gray-500  table-fixed max-h-[70vh] overflow-y-auto'>
                                          <thead class='text-xs text-gray-700 uppercase bg-gray-50 '>
                                            <tr>
                                              <th scope='col' class='px-6 py-3'>
                                                Product Name
                                              </th>
                                              <th scope='col' class='px-6 py-3'>
                                                Quantity
                                              </th>
                                              <th scope='col' class='px-6 py-3'>
                                                Price
                                              </th>{' '}
                                              {order.status === 'delivered' && (
                                                <th
                                                  scope='col'
                                                  class='px-6 py-3'
                                                >
                                                  Status
                                                </th>
                                              )}
                                            </tr>
                                          </thead>
                                          <tbody className=''>
                                            {detailOrder !== null &&
                                              detailOrder.map(
                                                (detailOrder, key) => (
                                                  <>
                                                    <tr
                                                      class='odd:bg-white  even:bg-gray-50 border-b  border-gray-200'
                                                      key={key}
                                                    >
                                                      <th
                                                        scope='row'
                                                        class='px-6 py-4 font-medium text-gray-900 whitespace-nowrap '
                                                      >
                                                        <div className='flex'>
                                                          <div className='w-12'>
                                                            <img
                                                              src='https://cdn1.viettelstore.vn/Images/Product/ProductImage/935037970.jpeg'
                                                              alt=''
                                                            />
                                                          </div>
                                                          <div className='grid  '>
                                                            <h1 className='my-auto'>
                                                              {
                                                                detailOrder.product_name
                                                              }
                                                            </h1>
                                                            <p>Type: Gaming</p>
                                                          </div>
                                                        </div>
                                                      </th>
                                                      <td class='px-6 py-4'>
                                                        X{' '}
                                                        {
                                                          detailOrder.order_quantity
                                                        }
                                                      </td>
                                                      <td class='px-6 py-4'>
                                                        $
                                                        {
                                                          detailOrder.product_price
                                                        }
                                                      </td>
                                                      {order.status ===
                                                        'delivered' && (
                                                        <td class='px-6 py-4'>
                                                          <Popup
                                                            trigger={
                                                              <button className='button'>
                                                                <img
                                                                  src={
                                                                    assets.rating
                                                                  }
                                                                  className='w-10 '
                                                                  alt=''
                                                                />
                                                              </button>
                                                            }
                                                            modal
                                                            nested
                                                            onOpen={() => {
                                                              checkReview(
                                                                detailOrder.id
                                                              )
                                                              console.log(
                                                                isReview
                                                              )
                                                            }}
                                                          >
                                                            {close =>
                                                              isReview ===
                                                              true ? (
                                                                <>
                                                                  {/* {' dataReview ===
                                                                  true &&'} */}
                                                                  {dataReview &&
                                                                    dataReview.map(
                                                                      review => (
                                                                        <>
                                                                          <button
                                                                            className='text-[15px] font-bold absolute top-[-5%] right-[-15px] border bg-gray-300 text-red-500 rounded-full block px-[10px] py-[5px]  '
                                                                            onClick={
                                                                              close
                                                                            }
                                                                          >
                                                                            X
                                                                          </button>
                                                                          <div className='flex justify-center py-6'>
                                                                            <div>
                                                                              <th
                                                                                scope='row'
                                                                                class='px-6 py-4 font-medium text-gray-900 whitespace-nowrap '
                                                                              >
                                                                                <div className='flex'>
                                                                                  <div className='w-12'>
                                                                                    <img
                                                                                      src='https://cdn1.viettelstore.vn/Images/Product/ProductImage/935037970.jpeg'
                                                                                      alt=''
                                                                                    />
                                                                                  </div>
                                                                                  <div className='grid  '>
                                                                                    <h1 className='my-auto'>
                                                                                      {
                                                                                        detailOrder.product_name
                                                                                      }
                                                                                    </h1>
                                                                                    <p>
                                                                                      Type:
                                                                                      Gaming
                                                                                    </p>
                                                                                  </div>
                                                                                </div>
                                                                              </th>
                                                                            </div>
                                                                            <div className='relative'>
                                                                              <div className='absolute top-0 mr-3 grid grid-cols-2 w-full'>
                                                                                <div
                                                                                  className=' '
                                                                                  style={{
                                                                                    direction:
                                                                                      'ltr',
                                                                                    fontFamily:
                                                                                      'sans-serif',
                                                                                    touchAction:
                                                                                      'none'
                                                                                  }}
                                                                                >
                                                                                  <Rating
                                                                                    SVGclassName={
                                                                                      'inline-block'
                                                                                    }
                                                                                    initialValue={
                                                                                      review.rating
                                                                                    }
                                                                                    size={
                                                                                      16
                                                                                    }
                                                                                    readonly
                                                                                  />
                                                                                </div>
                                                                                <div className='flex justify-end text-gray-400'>
                                                                                  <p>
                                                                                    {
                                                                                      review.created_at.split(
                                                                                        'T'
                                                                                      )[0]
                                                                                    }
                                                                                  </p>
                                                                                </div>
                                                                              </div>
                                                                              <p className='border mt-8 w-96 px-2 py-3  rounded-md max-h-48 overflow-y-auto   '>
                                                                                {
                                                                                  review.review
                                                                                }
                                                                              </p>
                                                                            </div>
                                                                          </div>
                                                                        </>
                                                                      )
                                                                    )}
                                                                </>
                                                              ) : (
                                                                <>
                                                                  <div className='modal relative'>
                                                                    <button
                                                                      className='close absolute top-[-3%] right-[-2%] border rounded-full bg-black text-white w-8 h-8 flex '
                                                                      onClick={
                                                                        close
                                                                      }
                                                                    >
                                                                      <p className='m-auto'>
                                                                        x
                                                                      </p>
                                                                    </button>
                                                                    <div className='header text-center text-2xl'>
                                                                      {' '}
                                                                      Send
                                                                      Feedback{' '}
                                                                    </div>
                                                                    <div className='content '>
                                                                      <div
                                                                        className='flex justify-center my-4'
                                                                        style={{
                                                                          direction:
                                                                            'ltr',
                                                                          fontFamily:
                                                                            'sans-serif',
                                                                          touchAction:
                                                                            'none'
                                                                        }}
                                                                      >
                                                                        <Rating
                                                                          SVGclassName={
                                                                            'inline-block'
                                                                          }
                                                                          className='block'
                                                                          onClick={
                                                                            handleRating
                                                                          }
                                                                          showTooltip
                                                                          tooltipArray={[
                                                                            'Terrible',
                                                                            'Bad',
                                                                            'Average',
                                                                            'Great',
                                                                            'Perfect'
                                                                          ]}
                                                                        />
                                                                      </div>
                                                                      <div className='p-4 '>
                                                                        <textarea
                                                                          name='feedback'
                                                                          id=''
                                                                          value={
                                                                            formReview.feedback
                                                                          }
                                                                          onChange={e => {
                                                                            setFormReview(
                                                                              {
                                                                                ...formReview,
                                                                                [e
                                                                                  .target
                                                                                  .name]:
                                                                                  e
                                                                                    .target
                                                                                    .value
                                                                              }
                                                                            )
                                                                            console.log(
                                                                              formReview
                                                                            )
                                                                          }}
                                                                          className='border  w-full h-[300px] resize-none p-8'
                                                                        ></textarea>
                                                                      </div>
                                                                    </div>
                                                                    <div className='flex justify-center'>
                                                                      {' '}
                                                                      <button
                                                                        onClick={() => {
                                                                          addReview(
                                                                            detailOrder.id
                                                                          )
                                                                        }}
                                                                        class=' my-4 rounded-2xl text-red hover:before:bg-redborder-red-500 relative h-[50px] w-40 overflow-hidden border border-black bg-white px-3  shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-black before:transition-all before:duration-500 hover:text-white hover:shadow-black hover:before:left-0 hover:before:w-full'
                                                                      >
                                                                        <span class='relative z-10'>
                                                                          Send
                                                                        </span>
                                                                      </button>
                                                                    </div>
                                                                  </div>
                                                                </>
                                                              )
                                                            }
                                                          </Popup>
                                                        </td>
                                                      )}
                                                    </tr>
                                                  </>
                                                )
                                              )}
                                          </tbody>
                                        </table>
                                      </div>
                                      <div className='my-8 grid grid-cols-2 gap-40'>
                                        <div className=''>
                                          <h1 className='text-2xl font-semibold my-3'>
                                            Shipping Information
                                          </h1>
                                          <div>
                                            <div className='flex justify-between'>
                                              <p className='text-gray-500'>
                                                Name:{' '}
                                              </p>
                                              <span className='font-semibold'>
                                                {order.name_order}
                                              </span>
                                            </div>
                                            <div className='flex justify-between'>
                                              <p className='text-gray-500'>
                                                Email:{' '}
                                              </p>
                                              <span className='font-semibold'>
                                                {order.email_order}
                                              </span>
                                            </div>
                                            <div className='flex justify-between'>
                                              <p className='text-gray-500'>
                                                Phone Number:{' '}
                                              </p>
                                              <span className='font-semibold'>
                                                {order.phone_order}
                                              </span>
                                            </div>
                                            <div className='flex justify-between'>
                                              <p className='text-gray-500'>
                                                Address:{' '}
                                              </p>
                                              <span className='font-semibold ml-16 text-end'>
                                                {order.address_order}
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                        <div className=''>
                                          <h1 className='text-2xl font-semibold my-3'>
                                            Price Information
                                          </h1>
                                          <div className='flex justify-between'>
                                            <p className='text-gray-500'>
                                              Subtotal
                                            </p>
                                            <span className='font-semibold text-lg'>
                                              ${order.totalprice}
                                            </span>
                                          </div>
                                          <div className='flex justify-between'>
                                            <p className='text-gray-500'>
                                              Shipping Fee
                                            </p>
                                            <span className='font-semibold text-lg'>
                                              Free
                                            </span>
                                          </div>
                                          <div className='flex justify-between'>
                                            <p className='text-gray-500'>
                                              Total
                                            </p>
                                            <span className='font-semibold text-lg'>
                                              ${order.totalprice}
                                            </span>
                                          </div>
                                          <div className='flex justify-between'>
                                            <p className='text-gray-500'></p>
                                            <span className='font-semibold text-lg'></span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                              </Popup>
                            </td>
                          </tr>
                        </>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default MyOrder
