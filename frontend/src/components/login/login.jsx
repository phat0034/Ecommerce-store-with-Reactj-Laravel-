import React, { useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import Cookies from 'js-cookie'

const login = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL_API; // Lấy từ .env
  const [dataForm, setDataForm] = useState({
    username: '',
    password: '',
    email: ''
  })
  const changeHandler = e => {
    setDataForm({ ...dataForm, [e.target.name]: e.target.value })
  }
  const loginSubmit = async () => {
    const responseData = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataForm)
    })
    let dataJson = await responseData.json()
    if (dataJson.success) {
      window.location.href = '/'
      Cookies.set('authToken', dataJson.token, { expires: 1 })
      // window.history.replaceState({}, document.title, "/");
      alert('Login successful')
    } else {
      console.log(dataJson)
      alert(dataJson.message || 'Login failed')
    }
  }
  const isLogin = Cookies.get('authToken')

  useEffect(() => {
    if (isLogin) {
      window.location.href = '/'
    }
  })
  return (
    <>
      <div className='loginContent grid grid-cols-1 md:grid-cols-12 py-8 md:pt-16 md:pb-24'>
        {/* Image section - hidden on mobile, visible on md and up */}
        <div className='hidden md:block md:col-span-5 md:col-start-3'>
          <img
            src={assets.signupimg}
            alt='Sign up illustration'
            className='w-full h-auto'
          />
        </div>

        {/* Login form section */}
        <div className='col-span-1 md:col-span-3 px-4 sm:px-0 flex justify-center md:block md:relative'>
          <div className='w-full max-w-md md:absolute  md:left-1/4'>
            <h1 className='text-2xl sm:text-3xl md:text-4xl tracking-wide pb-2 md:pb-3 text-center md:text-left'>
              Login Account
            </h1>
            <p className='mb-5 md:mb-7 text-center md:text-left'>
              Enter your details below
            </p>

            <div className='grid gap-6 md:gap-10'>
              {/* Email input */}
              <div className='relative'>
                <input
                  type='text'
                  id='username'
                  className='outline-none focus:outline-none focus:border-b-purple-500 focus:border-b-2 peer py-1 border-b-2 w-full'
                  required='required'
                  name='email'
                  value={dataForm.email}
                  onChange={changeHandler}
                />
                <label
                  htmlFor='username'
                  className='absolute left-0 top-1 cursor-text pointer-events-none peer-focus:text-xs peer-focus:text-purple-500 peer-focus:-top-4 peer-valid:text-xs peer-valid:-top-4 transition-all duration-300'
                >
                  Email or Phone Number
                </label>
              </div>

              {/* Password input */}
              <div className='relative'>
                <input
                  type='password'
                  id='password'
                  className='outline-none focus:outline-none focus:border-b-purple-500 focus:border-b-2 peer py-1 border-b-2 w-full'
                  required='required'
                  name='password'
                  value={dataForm.password}
                  onChange={changeHandler}
                />
                <label
                  htmlFor='password'
                  className='absolute left-0 top-1 cursor-text pointer-events-none peer-focus:text-xs peer-focus:text-purple-500 peer-focus:-top-4 peer-valid:text-xs peer-valid:-top-4 transition-all duration-300'
                >
                  Password
                </label>
              </div>

              {/* Login button and forgot password */}
              <div className='flex flex-col sm:flex-row gap-4 sm:gap-6 items-center'>
                <div className='w-full sm:w-1/2'>
                  <button
                    className='bg-red-500 text-white p-3 rounded-lg w-full'
                    onClick={() => {
                      loginSubmit()
                    }}
                  >
                    Login
                  </button>
                </div>
                <div className='w-full sm:w-1/2 text-center'>
                  <a href='' className='font-normal text-red-500'>
                    Forget Password?
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default login
