import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import { useEffect } from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
const SignUp = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL_API; // Lấy từ .env
  const [dataForm, setDataForm] = useState({
    name: '',
    email: '',
    password: ''
  })
  const changeHandler = e => {
    setDataForm({ ...dataForm, [e.target.name]: e.target.value })
  }
  const signUpBtn = async () => {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },

      body: JSON.stringify(dataForm)
    })
    const dataJson = await response.json()

    if (dataJson.success) {
      // window.location.replace('/')
      console.log(response);
      
      alert('Success')
      Cookies.set('authToken', dataJson.token, { expires: 1 })
      window.location.href = '/'
      // window.history.replaceState({}, document.title, "/");
    } else {
      alert(dataJson.message || 'Login failed with error: ' + dataJson.message)
    }
    console.log(dataJson)
  }
  const isLogin = Cookies.get('authToken')
  const navigate = useNavigate()
  useEffect(() => {
    if (isLogin) {
      window.location.href = '/'
    }
  })
  return (
    <>
      <div className='signUpContent grid grid-cols-1  md:grid-cols-12  py-8 md:pt-16 md:pb-24'>
        {/* Image section - hidden on mobile, visible on md and up */}
        <div className='hidden lg:block lg:col-span-5 lg:col-start-2 md:col-span-5 md:col-start-3'>
          <img
            src={assets.signupimg}
            alt='Sign up illustration'
            className='w-full h-auto'
          />
        </div>

        {/* Sign up form section */}
        <div className='col-span-1 xl:col-span-4 lg:col-span-6 2xl:py-24 xl:py-12 lg:py-0 md:py-0 md:col-span-10 md:col-start-2 px-6 sm:px-8 md:px-16'>
          <h1 className='text-2xl sm:text-3xl md:text-4xl tracking-wide pb-2 md:pb-3 text-center md:text-left'>
            Create an account
          </h1>
          <p className='mb-5 md:mb-7 text-center md:text-left'>
            Enter your details below
          </p>

          <div className='grid gap-6 md:gap-10'>
            {/* Name input */}
            <div className='relative'>
              <input
                type='text'
                id='username'
                name='name'
                className='outline-none focus:outline-none focus:border-b-purple-500 focus:border-b-2 peer py-1 border-b-2 w-full px-2'
                required='required'
                value={dataForm.name}
                onChange={changeHandler}
              />
              <label
                htmlFor='username'
                className='absolute left-0 top-1 cursor-text pointer-events-none peer-focus:text-xs peer-focus:text-purple-500 peer-focus:-top-4 peer-valid:text-xs peer-valid:-top-4 transition-all duration-300'
              >
                Name
              </label>
            </div>

            {/* Email input */}
            <div className='relative'>
              <input
                type='text'
                name='email'
                id='email'
                className='outline-none focus:outline-none focus:border-b-purple-500 focus:border-b-2 peer py-1 border-b-2 w-full px-2'
                required='required'
                value={dataForm.email}
                onChange={changeHandler}
              />
              <label
                htmlFor='email'
                className='absolute left-0 top-1 cursor-text pointer-events-none peer-focus:text-xs peer-focus:text-purple-500 peer-focus:-top-4 peer-valid:text-xs peer-valid:-top-4 transition-all duration-300'
              >
                Email or Phone Number
              </label>
            </div>

            {/* Password input */}
            <div className='relative'>
              <input
                type='password'
                name='password'
                id='password'
                className='outline-none focus:outline-none focus:border-b-purple-500 focus:border-b-2 peer py-1 border-b-2 w-full px-2'
                required='required'
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

            {/* Create Account button */}
            <button
              className='bg-red-500 text-white p-3 sm:p-4 rounded-lg'
              onClick={signUpBtn}
            >
              Create Account
            </button>

            {/* Sign up with Google */}
            <a
              href=''
              className='text-center p-3 sm:p-4 border rounded-lg font-semibold flex items-center justify-center gap-2'
            >
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M21.8055 10.0415H21V10H12V14H17.6515C16.827 16.3285 14.6115 18 12 18C8.6865 18 6 15.3135 6 12C6 8.6865 8.6865 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C6.4775 2 2 6.4775 2 12C2 17.5225 6.4775 22 12 22C17.5225 22 22 17.5225 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z'
                  fill='#FFC107'
                />
                <path
                  d='M3.15302 7.3455L6.43851 9.755C7.32752 7.554 9.48052 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C8.15902 2 4.82802 4.1685 3.15302 7.3455Z'
                  fill='#FF3D00'
                />
                <path
                  d='M12 22C14.583 22 16.93 21.0115 18.7045 19.404L15.6095 16.785C14.5717 17.5742 13.3037 18.001 12 18C9.39897 18 7.19047 16.3415 6.35847 14.027L3.09747 16.5395C4.75247 19.778 8.11347 22 12 22Z'
                  fill='#4CAF50'
                />
                <path
                  d='M21.8055 10.0415H21V10H12V14H17.6515C17.2571 15.1082 16.5467 16.0766 15.608 16.7855L15.6095 16.7845L18.7045 19.4035C18.4855 19.6025 22 17 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z'
                  fill='#1976D2'
                />
              </svg>
              Sign up with Google
            </a>
          </div>

          {/* Login link */}
          <div className='text-center my-6'>
            <span className='text-sm sm:text-base'>
              Already have account?{' '}
              <a
                href=''
                className='border-b-2 font-semibold ml-2 py-1 hover:border-black'
              >
                Log In
              </a>
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
export default SignUp
