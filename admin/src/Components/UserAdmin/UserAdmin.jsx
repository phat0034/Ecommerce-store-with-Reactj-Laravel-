import React, { useEffect, useState } from 'react'
import { assets } from '../../../../frontend/src/assets/assets'
import Popup from 'reactjs-popup'
import '../../App.css'
import { useNavigate, useSearchParams, useParams } from 'react-router-dom'
function UserAdmin () {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL_API; // Lấy từ .env
  const API_BASE = import.meta.env.VITE_API_BASE_URL; // Lấy từ .env
  const [dataUser, setDataUser] = useState([])
  const [query, setQuery] = useState('')
  const [addressData, setAdressData] = useState(false)
  const fetchUserData = async () => {
    try {
      const res = await fetch('${API_BASE_URL}/getuseradmin', {
        method: 'GET'
      })
      const data = await res.json()
      if (data.success) {
        setDataUser(data.data)
      } else {
        console.error(data.message)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const setRole = async (iduser, role) => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/setrole?iduser=${iduser}&role=${role}`,
        {
          method: 'POST'
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
  const findUser = async value => {
    try {
      const res = await fetch(`${API_BASE_URL}/finduser?s=${value}`, {
        method: 'GET'
      })
      const data = await res.json()
      if (data.success) {
        setDataUser(data.data)
      }
    } catch (error) {
      console.error(error)
    }
  }
  const getAddress = async id => {
    setAdressData(null)
    try {
      const response = await fetch(
        `${API_BASE_URL}/showaddressadmin?id=${id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      const data = await response.json()
      if (data.success) {
        setAdressData(data.data)
        console.log(addressData)
      } else {
        console.error(data.message)
      }
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    if (query.trim() !== '') {
      findUser(query)
    } else {
      fetchUserData()
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
                    Username
                  </th>
                  <th scope='col' class='px-6 py-3'>
                    Email
                  </th>
                  <th scope='col' class='px-6 py-3'>
                    Password
                  </th>
                  <th scope='col' class='px-6 py-3'>
                    Role
                  </th>
                  <th scope='col' class='px-6 py-3'>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {dataUser.map((user, key) => (
                  <>
                    <tr
                      class='odd:bg-white even:bg-gray-50  border-b  border-gray-200'
                      key={key}
                    >
                      <th
                        scope='row'
                        class='px-6 py-4 font-medium text-gray-900 whitespace-nowrap '
                      >
                        #{user.id}
                      </th>
                      <td class='px-6 py-4'>{user.name}</td>
                      <td class='px-6 py-4'>{user.email}</td>
                      <td class='px-6 py-4'>
                        <div className='flex'>
                          <p className='py-1 rounded-3xl   capitalize'>
                            ***************
                          </p>
                        </div>
                      </td>
                      <td class='px-6 py-4 '>
                        <select
                          id='cars'
                          className='border rounded-2xl p-1'
                          value={user.role}
                          onChange={e => setRole(user.id, e.target.value)}
                        >
                          <option value='user'>User</option>
                          <option value='admin'>Admin</option>
                        </select>
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
                          onOpen={() => getAddress(user.id)}
                          modal
                          nested
                          contentStyle={{
                            width: '60%'
                          }}
                        >
                          {close &&
                            (addressData === null ? (
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
                                  List Address #{}
                                </h1>
                                <div className='content max-h-[60vh] overflow-y-auto '>
                                  <table class='w-full text-sm text-left rtl:text-right text-gray-500  table-fixed max-h-[70vh] overflow-y-auto'>
                                    <thead class='text-xs text-gray-700 uppercase bg-gray-50 '>
                                      <tr>
                                        <th scope='col' class='px-6 py-3'>
                                          Title Address
                                        </th>
                                        <th scope='col' class='px-6 py-3'>
                                          Name Address
                                        </th>
                                        <th scope='col' class='px-6 py-3'>
                                          Address
                                        </th>
                                        <th scope='col' class='px-6 py-3'>
                                          Email
                                        </th>
                                        <th scope='col' class='px-6 py-3'>
                                          Phone Number
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody className=''>
                                      {addressData  ? (
                                        addressData.map(address => (
                                          <>
                                            <tr class='odd:bg-white  even:bg-gray-50 border-b  border-gray-200'>
                                              <td class='px-6 py-4'>
                                                {address.title_address}
                                              </td>
                                              <td class='px-6 py-4'>
                                                {address.name_address}
                                              </td>
                                              <td class='px-6 py-4'>
                                                {address.address_delevery}
                                              </td>
                                              <td class='px-6 py-4'>
                                                {address.email_address}
                                              </td>
                                              <td class='px-6 py-4'>
                                                {address.phone_address}
                                              </td>
                                            </tr>
                                          </>
                                        ))
                                      ) : (
                                        <>
                                          <div>
                                            <p>Null</p>
                                          </div>
                                        </>
                                      )}
                                    </tbody>
                                  </table>
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

export default UserAdmin
