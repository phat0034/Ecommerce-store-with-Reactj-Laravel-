import React, { useEffect } from 'react'
import { useState } from 'react'
import { assets } from '../../assets/assets'
import { Routes, Route, useLocation } from 'react-router-dom'
import Cookies from 'js-cookie'
import SideBar from './SideBar'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import Empty from '../Emptypage/Emptypage'
function MyProfile () {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL_API; // Lấy từ .env
  const [isOpen, setIsOpen] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState(null) // Lưu ID của địa chỉ chọn

  const [loading, setLoading] = useState(true) // Thêm trạng thái loading

  const token = Cookies.get('authToken')
  //dùng để lưu thông tin để add address
  const [addressData, setAdressData] = useState({
    title_address: '',
    name_address: '',
    address: '',
    email_address: '',
    phone_address: ''
  })
  // dùng để chỉnh sửa address người dùng
  const [editData, setEdit] = useState({
    id: '',
    title_address: '',
    name_address: '',
    address: '',
    email_address: '',
    phone_address: ''
  })
  // chứa dữ liệu khi fetch từ get address api
  const [newData, setNewData] = useState(false)
  //lưu vào mảng  khi nhập input của form add address
  const changeHandler = e => {
    setAdressData({ ...addressData, [e.target.name]: e.target.value })
  }
  //chỉnh sửa thông tin mảng
  const changeEditHanldler = e => {
    setEdit({ ...editData, [e.target.name]: e.target.value })
    console.log('editData: ', editData)
  }
  const changeEditHandler = item => {
    setEdit({
      ...item
    })
  }
  const getAddress = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/showaddress`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      if (data.success) {
        setNewData(data.data)

        setRefresh(prev => !prev) // Kích hoạt refresh
      } else {
        console.error(data.message)
      }
    } catch (error) {
      console.error(error)
    }
  }
  const addAddress = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/addaddress`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(addressData)
      })
      const data = await response.json()
      if (data.success) {
        setNewData(prevData => [...prevData, data.data])
        setAdressData({
          // Reset form sau khi thêm
          title_address: '',
          name_address: '',
          address: '',
          email_address: '',
          phone_address: ''
        })
        setRefresh(prev => !prev) // Kích hoạt refresh
      } else {
        console.error(data.message)
      }
    } catch (error) {
      console.error(error)
    }
  }
  const removeAddress = async id => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/deleteaddress?id=${id}`,
        {
          method: 'Delete',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(addressData)
        }
      )
      const data = await response.json()
      if (data.success) {
        setRefresh(prev => !prev) // Kích hoạt refresh
        setLoading(false)
      } else {
        console.error(data.message)
      }
    } catch (error) {
      console.error(error)
    }
  }
  const editAddress = async id => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/editaddress?id=${id}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(editData)
        }
      )
      const data = await response.json()
      if (data.success) {
        setLoading(false)
        console.log(data)
        setNewData(prevData => [...prevData, data.data])
        setNewData([])
      } else {
        console.error(data.message)
      }
    } catch (error) {
      console.error(error)
    }
  }
  const setAddress = async id => {
    // Cập nhật UI ngay lập tức
    setSelectedAddress(id)

    try {
      const response = await fetch(
        `${API_BASE_URL}/updateaddress?id=${id}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      )
      const data = await response.json()
      if (!data.success) {
        console.error(data.message)
        // Nếu API thất bại, có thể lấy lại trạng thái cũ
        getAddress()
      }
    } catch (error) {
      console.error(error)
      // Nếu API thất bại, có thể lấy lại trạng thái cũ
      getAddress()
    }
  }
  useEffect(() => {
    getAddress()
  }, [refresh])
  return (
    <>
      <div className='flex  bg-gray-100 z-[1] '>
        {/* Sidebar */}
        <SideBar />
        {/* Content */}
        <div className='flex-1 p-6'>
          <button
            className='md:hidden p-2 bg-gray-200 rounded-lg'
            onClick={() => setIsOpen(true)}
          ></button>
          <div className='bg-white p-6 rounded-lg shadow-lg'>
            <div className='flex justify-between'>
              <h1 className='text-xl font-semibold my-auto'>
                Delevery Address{' '}
              </h1>
              <div className='flex '>
                <Popup
                  trigger={
                    <button className='border rounded-2xl py-3 px-6 me-6  justify-end before:ease relative h-12 w-40 overflow-hidden  border-gray-500 text-black shadow-2xl transition-all before:absolute before:top-1/2 before:h-0 before:w-64 before:origin-center before:-translate-x-20 before:rotate-45 before:bg-black before:duration-300 hover:text-white hover:shadow-black hover:before:h-64 hover:before:-translate-y-32'>
                      <span class='relative z-1'>Add Address</span>{' '}
                    </button>
                  }
                  modal
                  nested
                  contentStyle={{ width: '30%' }}
                >
                  {close => (
                    <div className='modal p-6  relative  '>
                      <button
                        className='text-[15px] font-bold absolute top-[-7%] right-[-15px] border bg-gray-300 text-red-500 rounded-full block px-[10px] py-[5px]  '
                        onClick={close}
                      >
                        X
                      </button>
                      <h1 className='header text-2xl mb-3 '> Add Address </h1>
                      <div className='content '>
                        <div className='grid grid-cols-3 my-4 '>
                          <p className='my-auto'>Title Address</p>
                          <input
                            name='title_address'
                            value={addressData.title_address}
                            type='text'
                            onChange={changeHandler}
                            className=' col-span-2  border border-gray-400 px-3 py-1 focus:border-blue-400 focus:outline-none rounded-md shadow-lg '
                          />
                        </div>
                        <div className='grid grid-cols-3 my-4 '>
                          <p className='my-auto'>Name Order</p>
                          <input
                            name='name_address'
                            value={addressData.name_address}
                            type='text'
                            onChange={changeHandler}
                            className=' col-span-2  border border-gray-400 px-3 py-1 focus:border-blue-400 focus:outline-none rounded-md shadow-lg '
                          />
                        </div>
                        <div className='grid grid-cols-3  my-4'>
                          <p className='my-auto'>Email Order</p>
                          <input
                            name='email_address'
                            value={addressData.email_address}
                            type='text'
                            onChange={changeHandler}
                            className=' col-span-2  border border-gray-400 px-3 py-1 focus:border-blue-400 focus:outline-none rounded-md shadow-lg '
                          />
                        </div>{' '}
                        <div className='grid grid-cols-3 my-4 '>
                          <p className='my-auto'>Phone Order</p>
                          <input
                            name='phone_address'
                            value={addressData.phone_address}
                            type='text'
                            onChange={changeHandler}
                            className=' col-span-2  border border-gray-400 px-3 py-1 focus:border-blue-400 focus:outline-none rounded-md shadow-lg '
                          />
                        </div>
                        <div className='grid grid-cols-3 my-4 '>
                          <p className='my-auto'>Address</p>
                          <input
                            name='address'
                            value={addressData.address}
                            type='text'
                            onChange={changeHandler}
                            className=' col-span-2  border border-gray-400 px-3 py-1 focus:border-blue-400 focus:outline-none rounded-md shadow-lg '
                          />
                        </div>
                      </div>

                      <div className='actions flex justify-end'>
                        <button
                          onClick={() => {
                            addAddress()
                            close()
                          }}
                          className=' border rounded-md px-6 py-2 hover:bg-black hover:text-white'
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  )}
                </Popup>
              </div>
            </div>
            {newData.length === 0 ? (
              <Empty />
            ) : (
              <div className='grid grid-cols-4 gap-3 2xl:grid-cols-4 xl:grid-cols-3  lg:grid-cols-2 md:grid-cols-1 xs:grid-cols-1   '>
                {newData.length === 0 ? (
                  <>
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
                  </>
                ) : newData ? (
                  newData.map((item, key) => (
                    <>
                      {}
                      <div
                        className='cardAddress   border-2 m-6 p-4 rounded-xl shadow-2xl relative xl:m-4 lg:m-0  '
                        key={key}
                      >
                        <input
                          type='radio'
                          className='absolute right-[5%] top-[5%] w-6 h-6'
                          name='address'
                          checked={
                            // selectedAddress === item.id ||
                            // (selectedAddress === null &&)
                            item.set_address === 'yes'
                          }
                          onClick={() => setAddress(item.id)} // ✅ Gọi API khi thay đổi
                        />
                        <h2 className='text-xl font-semibold text-center'>
                          {item.title_address}
                        </h2>

                        <div className='my-3 flex gap-2'>
                          <p className='text-lg font-medium'>Name Order: </p>
                          <span className='m-auto text-[17px]'>
                            {item.name_address}
                          </span>
                        </div>
                        <div className='my-3 flex gap-2'>
                          <p className='text-lg font-medium'>Email Order: </p>
                          <span className='m-auto text-[17px]'>
                            {item.email_address}
                          </span>
                        </div>
                        <div className='my-3 flex gap-2'>
                          <p className='text-xl font-medium'>Phone Order: </p>
                          <span className='m-auto text-[17px]'>
                            {item.phone_address}
                          </span>
                        </div>
                        <div className='my-3 flex gap-2'>
                          <p className='text-xl font-medium'>Address: </p>
                          <span className=' text-[17px]'>
                            {item.address_delevery}
                          </span>
                        </div>
                        <div className='editPlace grid grid-cols-2 gap-3'>
                          <Popup
                            onOpen={() => {
                              changeEditHandler(item)
                            }}
                            trigger={
                              <button className=' py-2 border-2 rounded-xl hover:bg-green-600 hover:text-white text-center cursor-pointer'>
                                <span class='relative z-1'>Edit</span>{' '}
                              </button>
                            }
                            modal
                            nested
                            contentStyle={{ width: '30%' }}
                          >
                            {close => (
                              <div className='modal p-6  relative  '>
                                <button
                                  className='text-[15px] font-bold absolute top-[-7%] right-[-15px] border bg-gray-300 text-red-500 rounded-full block px-[10px] py-[5px]  '
                                  onClick={close}
                                >
                                  X
                                </button>
                                <h1 className='header text-2xl mb-3 '>
                                  {' '}
                                  Edit Address{' '}
                                </h1>
                                <div className='content '>
                                  <div className='grid grid-cols-3 my-4 '>
                                    <p className='my-auto'>Title Address</p>
                                    <input
                                      name='title_address'
                                      value={editData.title_address}
                                      type='text'
                                      onChange={changeEditHanldler}
                                      className=' col-span-2  border border-gray-400 px-3 py-1 focus:border-blue-400 focus:outline-none rounded-md shadow-lg '
                                    />
                                  </div>
                                  <div className='grid grid-cols-3 my-4 '>
                                    <p className='my-auto'>Name Order</p>
                                    <input
                                      name='name_address'
                                      value={editData.name_address}
                                      type='text'
                                      onChange={changeEditHanldler}
                                      className=' col-span-2  border border-gray-400 px-3 py-1 focus:border-blue-400 focus:outline-none rounded-md shadow-lg '
                                    />
                                  </div>
                                  <div className='grid grid-cols-3  my-4'>
                                    <p className='my-auto'>Email Order</p>
                                    <input
                                      name='email_address'
                                      value={editData.email_address}
                                      type='text'
                                      onChange={changeEditHanldler}
                                      className=' col-span-2  border border-gray-400 px-3 py-1 focus:border-blue-400 focus:outline-none rounded-md shadow-lg '
                                    />
                                  </div>{' '}
                                  <div className='grid grid-cols-3 my-4 '>
                                    <p className='my-auto'>Phone Order</p>
                                    <input
                                      name='phone_address'
                                      value={editData.phone_address}
                                      type='text'
                                      onChange={changeEditHanldler}
                                      className=' col-span-2  border border-gray-400 px-3 py-1 focus:border-blue-400 focus:outline-none rounded-md shadow-lg '
                                    />
                                  </div>
                                  <div className='grid grid-cols-3 my-4 '>
                                    <p className='my-auto'>Address</p>
                                    <input
                                      name='address_delevery'
                                      value={editData.address_delevery}
                                      type='text'
                                      onChange={changeEditHanldler}
                                      className=' col-span-2  border border-gray-400 px-3 py-1 focus:border-blue-400 focus:outline-none rounded-md shadow-lg '
                                    />
                                  </div>
                                </div>

                                <div className='actions flex justify-end'>
                                  <button
                                    className=' border rounded-md px-6 py-2 hover:bg-black hover:text-white'
                                    onClick={() => editAddress(editData.id)}
                                  >
                                    Edit
                                  </button>
                                </div>
                              </div>
                            )}
                          </Popup>

                          <p
                            className='  py-2 border-2 rounded-xl hover:bg-red-600 hover:text-white text-center cursor-pointer'
                            onClick={() => removeAddress(item.id)}
                          >
                            Remove
                          </p>
                        </div>
                      </div>
                    </>
                  ))
                ) : (
                  <>
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
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default MyProfile
