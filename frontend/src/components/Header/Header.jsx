import React from 'react'
import { useState, useRef, useEffect } from 'react'
import { assets } from '../../assets/assets'
import { motion } from 'framer-motion'
import Cookies from 'js-cookie'
import { useNavigate, useSearchParams, useParams } from 'react-router-dom'
import login from '../login/login'
import { useLocation,Link  } from 'react-router-dom'
const API_HOST = import.meta.env.VITE_API_BASE_URL_API


export const Header = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const [keywordSearch, setKeywordSearch] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolly, setScroll] = useState(false)
  const [countCart, setCountCart] = useState(0)

  const stickyHeader = () => {
    if (window.scrollY < 100) {
      setScroll(false)
    } else {
      setScroll(true)
    }
  }
  window.addEventListener('pageshow', function (event) {
    if (event.persisted) {
      // Xóa thông tin đăng nhập khỏi localStorage
      localStorage.removeItem('email')
      localStorage.removeItem('password')
    }
  })

  window.addEventListener('scroll', stickyHeader) //85
  const ref = useRef()
  const [navBarOpen, setIsOpenNavbar] = useState(false)
  const token = Cookies.get('authToken')
  const searchBtn = (kw, e) => {
    if (searchParams.has('s') == null) {
      navigate('/')
    }
    navigate(`/search?s=${kw}`)
  }
  const searchHandler = e => {
    setKeywordSearch(e.target.value)
  }
  const countItemsCart = async () => {
    try {
      const response = await fetch(`${API_HOST}/countcart`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      if (data.success) {
        setCountCart(parseInt(data.data))
      } else {
        console.error(data.message)
      }
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    countItemsCart()
  })

  return (
    <>
      {/* <div className='headerContainer  w-full z-50 fixed top-0 right-0'> */}
      <div
        className={
          isScrolly
            ? 'headerContainer  w-full z-10 fixed top-0 right-0'
            : 'headerContainer  w-ful z-10 '
        }
      >
        {/*-------------------------FOR MOBILE RESPONSIVE -----------------------*/}
        {navBarOpen && (
          <div className='bg-black/80 fixed w-full h-screen z-10 left-0 xs:h-full'>
            <div className=' w-[300px] h-screen bg-white z-[999999999999999999999] xs:h-full '>
              <div
                className='fixed z-10  w-6 h-6 rounded-md  text-red-500  text-[30px] left-[32%] -top-2 transform translate-x-2  '
                onClick={() => {
                  setIsOpenNavbar(false)
                }}
              >
                X
              </div>
              <motion.div
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 15 }}
                exit={{ opacity: 0, x: 15 }}
                ref={ref}
              >
                <div className='navBarMenu ml-10 my-auto xs:fixed xs:top-0 xs:left-0 xs:z-50'>
                  <ul className='flex flex-col my-16 justify-between gap-10 '>
                    <li className=' border-gray-800 flex space-x-2 '>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        x='0px'
                        y='0px'
                        width='25'
                        height='25'
                        viewBox='0 0 24 24'
                      >
                        <path d='M 12 2.0996094 L 1 12 L 4 12 L 4 21 L 11 21 L 11 15 L 13 15 L 13 21 L 20 21 L 20 12 L 23 12 L 12 2.0996094 z M 12 4.7910156 L 18 10.191406 L 18 11 L 18 19 L 15 19 L 15 13 L 9 13 L 9 19 L 6 19 L 6 10.191406 L 12 4.7910156 z'></path>
                      </svg>
                      <Link to='/' className='my-auto'>
                        Home
                      </Link>
                    </li>
                    <li className=' border-gray-800 flex space-x-2'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke-width='1.5'
                        stroke='currentColor'
                        class='size-6'
                      >
                        <path
                          stroke-linecap='round'
                          stroke-linejoin='round'
                          d='M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z'
                        />
                      </svg>

                      <Link to='/contact' target='_blank'>
                        Contact
                      </Link>
                    </li>
                    <li className=' border-gray-800 flex space-x-2'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke-width='1.5'
                        stroke='currentColor'
                        class='size-6'
                      >
                        <path
                          stroke-linecap='round'
                          stroke-linejoin='round'
                          d='M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z'
                        />
                      </svg>

                      <Link to='/about'>About</Link>
                    </li>
                    {!token && (
                      <li className=' border-gray-800 flex space-x-2'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke-width='1.5'
                          stroke='currentColor'
                          class='size-6'
                        >
                          <path
                            stroke-linecap='round'
                            stroke-linejoin='round'
                            d='M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z'
                          />
                        </svg>

                        <Link to='/signup'>Sign Up</Link>
                      </li>
                    )}
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        )}

        <div>
          <div className='text-center text-white bg-[#000] xs:text-[10px]  md:text-[13px] lg:text-[13px] '>
            <span>
              Summer Store For All Swim Suits And Free Express Delivery - OFF
              50%!
            </span>
            <Link to='/allproduct'> Shop Now</Link>
          </div>
          <div className='flex justify-between pt-3 px-24 pb-2 border-b-2 bg-white xl:px-12 lg:p-0 md:px-0 xs:px-2 xl:gap-24'>
            <div className='flex w-full xl:gap-20 lg:gap-6 lg:w-3/5 md:gap-0 xs:w-full xs:justify-between   '>
              <div
                id='mobile '
                className='lg:hidden md:w-6 md:my-auto md:mx-4 xs:w-7 xs:my-auto xs:mx-4'
              >
                <button>
                  <img
                    src={assets.hamburgermenu}
                    onClick={() => {
                      setIsOpenNavbar(true)
                    }}
                    alt=''
                  />
                </button>
              </div>
              <div className='logo my-auto mr-96 md:w-20 md:mx-3 xs:text-sm xs:m-0 xs:my-auto xs:text-[18px] '>
                <Link to=''>Tech Store</Link>
              </div>
              <div className='navBarMenu ml-20 my-auto xs:hidden md:hidden lg:flex   '>
                <ul className='flex justify-between lg:gap-16 '>
                  <li className='hover:border-b my-auto border-gray-800'>
                    <Link to='/'>Home</Link>
                  </li>
                  <li className='hover:border-b  my-auto border-gray-800'>
                    <Link
                      to='https://www.facebook.com/braindoti/'
                      target='_blank'
                    >
                      Contact
                    </Link>
                  </li>
                  <li className='hover:border-b my-auto border-gray-800'>
                    <Link to='about'>About</Link>
                  </li>
                  {token ? (
                    ''
                  ) : (
                    <li className='hover:border-b my-auto border-gray-800'>
                      <Link to='/signup'>Sign Up</Link>
                    </li>
                  )}
                </ul>
              </div>
            </div>
            <div className='narBarSearch flex items-center px-3 md:px-2 lg:my-2   '>
              <div className='searchBar flex items-center px-3 relative  left-8 xl:w-[350px] xl:py-2 md:w-96  lg:w-[auto] xs:left-0 xs:w-[180px]'>
                <label
                  htmlFor='searchInput'
                  className='relative -right-[90%] transform translate-y-0 z-10 flex justify-center'
                >
                  <button className=''>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth='1.5'
                      stroke='currentColor'
                      className='size-6 xs:size-4'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
                      />
                    </svg>
                  </button>
                </label>
                <input
                  value={keywordSearch}
                  onChange={searchHandler}
                  onKeyUp={e => {
                    if (e.key === 'Enter') {
                      searchBtn(keywordSearch)
                    }
                  }}
                  type='text'
                  className='w-full   relative placeholder-black rounded-md focus:border-none bg-gray-100 py-[7px] px-8 md:text-[12px] lg:px-4 lg:pr-12 lg:placeholder:text-[13px] xs:placeholder:text-[7px] 
                  xs:placeholder:flex xs:py-[10px] xs:px-[7px] xs:text-[9px] xs:pl-2 xs:pr-8 '
                  placeholder='What are u looking for?'
                  id='searchInput'
                />
              </div>
              <div className='flex gap-3 xs:hidden md:flex '>
                <Link to='/mywishlist' className='block m-auto'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    className='size-10'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z'
                    />
                  </svg>
                </Link>
                <Link to='/cart' className='block m-auto cart relative'>
                  {countCart > 0 && (
                    <p className='absolute top-[15%] right-[15%]  translate-x-[50%] translate-y-[-50%] bg-gray-500 text-white w-6 h-6 rounded-full text-center grid text-[10px]'>
                      <span className=' my-auto'>{countCart}</span>
                    </p>
                  )}

                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    className='w-8  rounded-full md:size-6 lg:size-10 '
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z'
                    />
                  </svg>
                </Link>
                {/* -------------------------USER PROFILE AND DROPDOWN---------------------- */}
                {token ? (
                  <div className='dropdownProfile relative md:flex md:my-auto '>
                    <button onClick={() => setIsOpen(prev => !prev)}>
                      <img
                        src={assets.user}
                        alt=''
                        className='w-8 border rounded-full md:size-6 lg:size-10 '
                      />
                    </button>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 15 }}
                        exit={{ opacity: 0, y: 15 }}
                        className='transition-all duration-700 absolute  z-50  bg-[rgba(122,122,122,0.37)] text-white text-lg rounded-lg backdrop-blur-2xl right-0 top-10 w-56 p-6 grid md:text-sm '
                      >
                        <ul className='grid gap-3'>
                          <li>
                            <Link to='/myprofile'>Manage My Account</Link>
                          </li>
                          <li>
                            <Link to='/myorder'>My Order</Link>
                          </li>
                          <li>
                            <Link to='/mywishlist'>My Wishlist</Link>
                          </li>
                          <li>
                            <Link to=''>My Reviews</Link>
                          </li>
                          <li>
                            <button
                              onClick={() => {
                                Cookies.remove('authToken')
                                window.location.reload()
                              }}
                            >
                              Logout
                            </button>
                          </li>
                        </ul>
                      </motion.div>
                    )}
                  </div>
                ) : (
                  <div className='dropdownProfile relative md:flex md:my-auto '>
                    <button onClick={() => setIsOpen(prev => !prev)}>
                      <Link
                        to='/login'
                        className='border p-1 px-3 text-[1rem] rounded-2xl hover:bg-black hover:text-white transition delay-75'
                      >
                        Login
                      </Link>
                      {/* <img
                        src={assets.user}
                        alt=''
                        className='w-8 border rounded-full md:size-6 '
                      /> */}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
