import React from 'react'
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <>
      <div className='grid grid-cols-3 place-items-center bg-white border-t border-t-red-500 py-2 md:hidden lg:hidden sm:hidden fixed bottom-0 left-0  xs:w-full xs:z-50'>
        <a
          href=''
          className=' gap place-items-center center justify-center my-auto'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='size-6 flex m-auto'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z'
            />
          </svg>
          <p>Wishlist</p>
        </a>
        <a
          href=''
          className=' gap place-items-center center justify-center my-auto'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='size-6 flex m-auto'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z'
            />
          </svg>{' '}
          <p>Cart</p>
        </a>
        <a
          href=''
          className=' gap place-items-center center justify-center my-auto'
        >
          <img
            src={assets.user}
            alt=''
            className='border rounded-full size-6 flex m-auto '
          />
          <p>Log In</p>
        </a>
       
      </div>
      <div className='bg-black'>
        <div className='grid grid-cols-5  text-white py-12 xs:grid-cols-1 xs:p-6 md:px-6 md:grid-cols-2 md:gap-10  lg:px-24 lg:grid-cols-5  '>
          <div className=''>
            <ul className='mb-4'>
              <li className='mb-4'>
                <a href='' className='text-[20px] font-semibold'>
                  Tech Store
                </a>
              </li>
              <li className='mb-4'>
                <p>Subscribe</p>
              </li>
              <li className='mb-4'>
                <p className='text-[15px] font-thin'>
                  Get 10% off your first order
                </p>
              </li>
            </ul>
            <form action='' className='flex items-center  relative mb-4'>
              <input
                type='email'
                className='bg-[#000] text-white placeholder-[#646464] border border-white rounded-md p-2 '
                placeholder='Enter Your Email'
              />
              <button className='right-8 relative'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='size-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5'
                  />
                </svg>
              </button>
            </form>
          </div>
          <div className='w-[250px]'>
            <h3 className='mb-4 text-[20px] font-semibold'>Support</h3>
            <ul className='text-[15px] font-thin'>
              <li className='mb-4'>
                <a href=''>111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</a>
              </li>
              <li className='mb-4'>
                <a href=''>exclusive@gmail.com</a>
              </li>
              <li className='mb-4'>
                <a href=''>+88015-88888-9999</a>
              </li>
            </ul>
          </div>
          <div className=''>
            <h3 className='mb-4 text-[20px] font-semibold'>Account</h3>
            <ul className='text-[15px] font-thin'>
              <li className='mb-4'>
                <a href=''>My Account</a>
              </li>
              <li className='mb-4'>
                <a href=''>Login / Register</a>
              </li>
              <li className='mb-4'>
                <a href=''>Cart</a>
              </li>
              <li className='mb-4'>
                <a href=''>Wishlist</a>
              </li>
              <li className='mb-4'>
                <a href=''>Shop</a>
              </li>
            </ul>
          </div>

          <div className='mb-4'>
            <h3 className='mb-4 text-[20px] font-semibold'>Quick Link</h3>
            <ul className='text-[15px] font-thin'>
              <li className='mb-4'>
                <a href=''>Privacy Policy</a>
              </li>
              <li className='mb-4'>
                <a href=''>Terms Of Use</a>
              </li>
              <li className='mb-4'>
                <a href=''>FAQ</a>
              </li>
              <li className='mb-4'>
                <a href=''>Contact</a>
              </li>
            </ul>
          </div>
          <div className=''>
            <h3 className=' text-[20px] font-semibold'>Download App</h3>
            <ul>
              <li className='mt-4'>
                <span className='text-[15px] text-[#afafaf] font-thin'>
                  Save $3 with App New User Only
                </span>
              </li>
              <li className='mb-4 grid grid-cols-4 gap-3 md:grid-cols-5 md:gap-3 '>
                <div className='w-20 col-span-1 md:w-full md:col-span-2'>
                  {' '}
                  <img src={assets.qrcode} alt='' className='' />
                </div>
                <div className='col-span-3 md:place-content-center '>
                  <img src={assets.chplay} alt='' className='w-32 md:w-full' />
                  <img
                    src={assets.applestore}
                    alt=''
                    className='w-32 md:w-full'
                  />
                </div>
              </li>
              <li className='mb-4 flex gap gap-3 w-32'>
                <a href='' className=''>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    x='0px'
                    y='0px'
                    width='30'
                    height='30'
                    viewBox='0 0 50 50'
                    fill='#ffff'
                    className='md:size-12'
                  >
                    <path d='M 25 3 C 12.861562 3 3 12.861562 3 25 C 3 36.019135 11.127533 45.138355 21.712891 46.728516 L 22.861328 46.902344 L 22.861328 29.566406 L 17.664062 29.566406 L 17.664062 26.046875 L 22.861328 26.046875 L 22.861328 21.373047 C 22.861328 18.494965 23.551973 16.599417 24.695312 15.410156 C 25.838652 14.220896 27.528004 13.621094 29.878906 13.621094 C 31.758714 13.621094 32.490022 13.734993 33.185547 13.820312 L 33.185547 16.701172 L 30.738281 16.701172 C 29.349697 16.701172 28.210449 17.475903 27.619141 18.507812 C 27.027832 19.539724 26.84375 20.771816 26.84375 22.027344 L 26.84375 26.044922 L 32.966797 26.044922 L 32.421875 29.564453 L 26.84375 29.564453 L 26.84375 46.929688 L 27.978516 46.775391 C 38.71434 45.319366 47 36.126845 47 25 C 47 12.861562 37.138438 3 25 3 z M 25 5 C 36.057562 5 45 13.942438 45 25 C 45 34.729791 38.035799 42.731796 28.84375 44.533203 L 28.84375 31.564453 L 34.136719 31.564453 L 35.298828 24.044922 L 28.84375 24.044922 L 28.84375 22.027344 C 28.84375 20.989871 29.033574 20.060293 29.353516 19.501953 C 29.673457 18.943614 29.981865 18.701172 30.738281 18.701172 L 35.185547 18.701172 L 35.185547 12.009766 L 34.318359 11.892578 C 33.718567 11.811418 32.349197 11.621094 29.878906 11.621094 C 27.175808 11.621094 24.855567 12.357448 23.253906 14.023438 C 21.652246 15.689426 20.861328 18.170128 20.861328 21.373047 L 20.861328 24.046875 L 15.664062 24.046875 L 15.664062 31.566406 L 20.861328 31.566406 L 20.861328 44.470703 C 11.816995 42.554813 5 34.624447 5 25 C 5 13.942438 13.942438 5 25 5 z'></path>
                  </svg>
                </a>
                <a href=''>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    x='0px'
                    y='0px'
                    width='30'
                    height='30'
                    fill='#ffff'
                    viewBox='0 0 50 50'
                    className='md:size-12'
                  >
                    <path d='M 16 3 C 8.8324839 3 3 8.8324839 3 16 L 3 34 C 3 41.167516 8.8324839 47 16 47 L 34 47 C 41.167516 47 47 41.167516 47 34 L 47 16 C 47 8.8324839 41.167516 3 34 3 L 16 3 z M 16 5 L 34 5 C 40.086484 5 45 9.9135161 45 16 L 45 34 C 45 40.086484 40.086484 45 34 45 L 16 45 C 9.9135161 45 5 40.086484 5 34 L 5 16 C 5 9.9135161 9.9135161 5 16 5 z M 37 11 A 2 2 0 0 0 35 13 A 2 2 0 0 0 37 15 A 2 2 0 0 0 39 13 A 2 2 0 0 0 37 11 z M 25 14 C 18.936712 14 14 18.936712 14 25 C 14 31.063288 18.936712 36 25 36 C 31.063288 36 36 31.063288 36 25 C 36 18.936712 31.063288 14 25 14 z M 25 16 C 29.982407 16 34 20.017593 34 25 C 34 29.982407 29.982407 34 25 34 C 20.017593 34 16 29.982407 16 25 C 16 20.017593 20.017593 16 25 16 z'></path>
                  </svg>
                </a>
                <a href=''>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    x='0px'
                    y='0px'
                    width='30'
                    height='30'
                    viewBox='0 0 50 50'
                    className='md:size-12'
                    fill='#ffff'
                  >
                    <path d='M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z'></path>
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className='coppyRight text-center w-full text-[#3d3d3d] text-[16px] border-[#3d3d3d] p-2  border-t'>
          <p>&copy; Copyright Downii 2024. All right reserved</p>
        </div>
      </div>
    </>
  )
}

export default Footer
