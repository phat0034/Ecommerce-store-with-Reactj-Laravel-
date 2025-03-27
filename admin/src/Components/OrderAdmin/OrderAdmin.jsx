import React, { useEffect, useState } from 'react'
import { assets } from '../../../../frontend/src/assets/assets'
import Popup from 'reactjs-popup'
import '../../App.css'
import { useNavigate, useSearchParams, useParams } from 'react-router-dom'
function OrderAdmin () {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL_API; // Lấy từ .env
  const API_BASE = import.meta.env.VITE_API_BASE_URL; // Lấy từ .env
  const [orderData, setOrderData] = useState(false)
  const [detailOrder, setDetailOrder] = useState([])
  const fetchOrder = async () => {
    const res = await fetch(`${API_BASE_URL}/getorder?admin=true`, {
      headers: {
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
  const fetchDetailOrder = async id => {
    setDetailOrder(null)
    const res = await fetch(
      `${API_BASE_URL}/getdetailorder?id_order=${id}`,
      {
        headers: {
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
  const editStatus = async (iduser, status) => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/editstatus?id=${iduser}&status=${status}`,
        {
          method: 'post'
        }
      )
      const data = await res.json()
      if (data.success) {
        console.log(data.message)
      } else {
        console.error(data.message)
      }
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    fetchOrder()
  })
  return (
    <>
      <div className='flex-1 p-6'>
        <div className='bg-white p-6 rounded-lg shadow-lg'>
          <div class='relative overflow-x-auto shadow-md sm:rounded-lg'>
            <table class='w-full text-sm text-left rtl:text-right text-gray-500 '>
              <thead class='text-xs text-gray-700 uppercase bg-gray-50 '>
                <tr>
                  <th scope='col' class='px-6 py-3'>
                    ID
                  </th>
                  <th scope='col' class='px-6 py-3'>
                    Username
                  </th>
                  <th scope='col' class='px-6 py-3'>
                    Name Order
                  </th>
                  <th scope='col' class='px-6 py-3'>
                    Address Order
                  </th>
                  <th scope='col' class='px-6 py-3'>
                    Email Order
                  </th>
                  <th scope='col' class='px-6 py-3'>
                    Phone Order
                  </th>
                  <th scope='col' class='px-6 py-3'>
                    Total Price
                  </th>
                  <th scope='col' class='px-6 py-3'>
                    Payment Method
                  </th>
                  <th scope='col' class='px-6 py-3'>
                    Status
                  </th>
                  <th scope='col' class='px-6 py-3'>
                    Order Date
                  </th>
                  <th scope='col' class='px-6 py-3'>
                    Detail
                  </th>
                </tr>
              </thead>
              <tbody>
                {orderData &&
                  orderData.map((order, key) => (
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
                        <td class='px-6 py-4'>{order.name}</td>
                        <td class='px-6 py-4'>{order.name_order}</td>
                        <td class='px-6 py-4'>{order.address_order}</td>
                        <td class='px-6 py-4'>{order.email_order}</td>
                        <td class='px-6 py-4'>{order.phone_order}</td>
                        <td class='px-6 py-4'>{order.totalprice}</td>
                        <td class='px-6 py-4'>{order.payment_method}</td>
                        <td class='px-6 py-4'>
                          <select
                            id='cars'
                            className='border rounded-2xl p-1'
                            value={order.status}
                            onChange={e => editStatus(order.id, e.target.value)}
                          >
                            <option value='pending' className='bg-blue'>Pending</option>
                            <option value='processing'>Processing</option>
                            <option value='shipped'>Shipped</option>
                            <option value='delivered'>Delivered</option>
                            <option value='cancelled'>Cancelled</option>
                          </select>
                        </td>
                        <td class='px-6 py-4'>
                          {order.created_at.split('T')[0]}
                        </td>
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
                            onOpen={() => fetchDetailOrder(order.id)}
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
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody className=''>
                                        {detailOrder &&
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
                                                    {detailOrder.order_quantity}
                                                  </td>
                                                  <td class='px-6 py-4'>
                                                    ${detailOrder.product_price}
                                                  </td>
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
                                        <p className='text-gray-500'>Total</p>
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
      </div>
    </>
  )
}

export default OrderAdmin
