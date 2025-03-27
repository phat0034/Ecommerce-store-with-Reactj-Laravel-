import React, { useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import SliderComponent from '../SliderComponent/SliderComponent'
import { product } from '../../assets/product/product'
import { catagory } from '../../assets/category/category'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import './SliderHomePage.css'
import Policy from '../Policy/PolicyPage'
function HomePage () {
  const API_HOST_API = import.meta.env.VITE_API_BASE_URL_API
  const API_HOST = import.meta.env.VITE_API_BASE_URL
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }
  const confMobileCatagory = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      }
    ]
  }

  const saleProducts = product.filter(product => product.salePrice > 0)
  const [typeData, setTypeData] = useState([])
  const [newProduct, setNewProduct] = useState([])
  const fetchNewProduct = async () => {
    try {
      await fetch(`${API_HOST_API}/getnewproduct`, { method: 'post' })
        .then(response => response.json())
        .then(data => {
          setNewProduct(data.data)
        })
    } catch (error) {
      console.error('Lỗi khi fetch dữ liệu:', error)
    }
  }
  const fetchCatagory = async () => {
    try {
      await fetch(`${API_HOST_API}/alltype`)
        .then(response => response.json())
        .then(data => {
          setTypeData(data.data)
        })
    } catch (error) {
      console.error('Lỗi khi fetch dữ liệu:', error)
    }
  }
  useEffect(() => {
    fetchCatagory()
    fetchNewProduct()
  }, [])

  return (
    <div className='px-24 h-full mb-20 xs:px-5  md:px-5 md:mb-10  lg:px-24'>
      <div className='banner  grid grid-cols-12  mb-32 xs:hidden xs:mb-5 md:grid md:mb-12 lg:mb-32 lg:grid '>
        <div className='catagory col-span-2 border-r text-[15px] xs:flex '>
          <ul>
            <li className='mt-12 mb-4 md:mt-4'>
              <a href=''>Woman's Fashion</a>
            </li>
            <li className='mb-4'>
              <a href=''>Electronics</a>
            </li>
            <li className='mb-4'>
              <a href=''>Men's Fashion</a>
            </li>
            <li className='mb-4'>
              <a href=''>Home & Lifestyle</a>
            </li>
            <li className='mb-4'>
              <a href=''>Sports & Outdoor</a>
            </li>
            <li className='mb-4'>
              <a href=''>Medicine</a>
            </li>
          </ul>
        </div>
        <div className='sliderProduct col-span-10 pt-12 pl-12 md:pt-4 md:pl-4'>
          <SliderComponent
            arrImages={[assets.slider1, assets.slider2, assets.slider3]}
          />
        </div>
      </div>
      <div className='forMobile slider-container xs:block md:hidden lg:hidden text-[10px] my-2'>
        <div className='sliderProduct col-span-10  md:pt-4 md:pl-4 mb-3'>
          <SliderComponent
            arrImages={[assets.slider1, assets.slider2, assets.slider3]}
          />
        </div>
        <Slider {...confMobileCatagory}>
          <div className='text-center '>
            {' '}
            <a href=''>Woman's Fashion</a>
          </div>
          <div className='text-center'>
            {' '}
            <a href=''>Electronics</a>
          </div>
          <div className='text-center'>
            {' '}
            <a href=''>Home & Lifestyle</a>
          </div>
          <div className='text-center'>
            {' '}
            <a href=''>Sports & Outdoor</a>
          </div>
          <div className='text-center'>
            {' '}
            <a href=''>Medicine</a>
          </div>
        </Slider>
      </div>
      <div className='forMobile slider-container xs:block md:hidden lg:hidden'></div>
      <div className='saleContents h-auto'>
        <h4 className='text-[#ff2626] text-[17px] text-xl font-bold border-l-8  border-[#ff2626] pl-3 '>
          Today's
        </h4>
        <div className='flashSaleTitle grid grid-cols-12 md:gap-4'>
          <h1 className='col-span-2  relative top-6 font-bold text-4xl xs:col-span-4 xs:text-lg xs:top-0 xs:my-auto md:text-2xl md:top-0 md:my-auto md:col-span-3 lg:text-4xl lg:col-span-2'></h1>
          {/* <div className='countDown col-start-11 place-content-end col-span-4 flex gap-6 xs:gap-3 md:gap-6  '>
            <div className='days'>
              <p className='text-[15px] xs:text-[10px] md:text-[10px]'>Days</p>
              <p className='text-[35px] font-bold xs:text-[25px] md:text-[25px]'>
                03{' '}
              </p>
            </div>
            <div className='hours'>
              <p className='text-[15px] xs:text-[10px] md:text-[10px]'>Days</p>
              <p className='text-[35px] font-bold xs:text-[25px] md:text-[25px]'>
                03{' '}
              </p>
            </div>
            <div className='minutes'>
              <p className='text-[15px] xs:text-[10px] md:text-[10px]'>Days</p>
              <p className='text-[35px] font-bold xs:text-[25px] md:text-[25px]'>
                03{' '}
              </p>
            </div>
            <div className='seconds'>
              <p className='text-[15px] xs:text-[10px] md:text-[10px]'>Days</p>
              <p className='text-[35px] font-bold xs:text-[25px] md:text-[25px]'>
                03{' '}
              </p>
            </div>
          </div> */}
        </div>
        <div className='slider-container md:block lg:hidden'>
          <Slider {...settings}>
            {newProduct.map(product => (
              <div className='cardProduct w-[25rem] md:h-full  h-auto mr-6 relative '>
                <img
                  src={`${API_HOST}/storage/${product.img}`}
                  alt=''
                  className='h-[300px] p-6'
                />
                <p className='py-4 px-2 text-white rounded-md font-semibold bg-red-600 w-[fit] max-w-[85px] h-3 absolute flex items-center   top-2 left-2 z-1'>
                  -
                  {(
                    ((product.price - product.saleprice) / product.price) *
                    100
                  ).toFixed(1)}
                  %
                </p>
                <div className='absolute z-1 top-2 right-2'>
                  <div className='bg-slate-300 rounded-full  w-7 h-7  relative mb-3'>
                    <a
                      href='/wishlist'
                      className='wishlist  absolute top-[25%] left-[20%]'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                        className='size-4'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z'
                        />
                      </svg>
                    </a>
                  </div>
                  <div className='bg-slate-300 rounded-full  w-7 h-7  relative mb-3'>
                    <a
                      href={`/detailproduct/${product.id}`}
                      className='view  absolute top-[25%] left-[20%]'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                        className='size-4'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z'
                        />
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
                        />
                      </svg>
                    </a>
                  </div>
                </div>
                <h3 className='text-[20px] font-bold h-[60px] max-h-[60px]'>
                  {product.namepd}
                </h3>
                <p className='text-red-600 font-semibold'>
                  ${product.saleprice}{' '}
                  <span className='text-[#7e7e7e] line-through'>
                    ${product.price}
                  </span>{' '}
                </p>
                <p className='flex gap-2 text-[18px] font-medium'>
                  <img src={assets.star} alt='' className='w-6' />
                  {parseFloat(product.avg_rating).toFixed(1) == 0
                    ? 'No ratings yet'
                    : parseFloat(product.avg_rating).toFixed(1)}
                </p>
              </div>
            ))}
          </Slider>
        </div>
        <div className='displayProduct flex space-x-4 xs:hidden md:hidden lg:flex'>
          {newProduct.map(product => (
            <div className='cardProduct w-[25rem] md:h-full  h-auto mr-6 relative '>
              <img
                src={`${API_BASE}/storage/${product.img}`}
                alt=''
                className='h-[300px] p-6'
              />
              <p className='py-4 px-2 text-white rounded-md font-semibold bg-red-600 w-[fit] max-w-[85px] h-3 absolute flex items-center   top-2 left-2 z-1'>
                -
                {(
                  ((product.price - product.saleprice) / product.price) *
                  100
                ).toFixed(1)}
                %
              </p>
              <div className='absolute z-1 top-2 right-2'>
                <div className='bg-slate-300 rounded-full  w-7 h-7  relative mb-3'>
                  <a
                    href='/wishlist'
                    className='wishlist  absolute top-[25%] left-[20%]'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth='1.5'
                      stroke='currentColor'
                      className='size-4'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z'
                      />
                    </svg>
                  </a>
                </div>
                <div className='bg-slate-300 rounded-full  w-7 h-7  relative mb-3'>
                  <a
                    href={`/detailproduct/${product.id}`}
                    className='view  absolute top-[25%] left-[20%]'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth='1.5'
                      stroke='currentColor'
                      className='size-4'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z'
                      />
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
                      />
                    </svg>
                  </a>
                </div>
              </div>
              <h3 className='text-[20px] font-bold h-[60px] max-h-[60px]'>
                {product.namepd}
              </h3>
              <p className='text-red-600 font-semibold'>
                ${product.saleprice}{' '}
                <span className='text-[#7e7e7e] line-through'>
                  ${product.price}
                </span>{' '}
              </p>
              <p className='flex gap-2 text-[18px] font-medium'>
                <img src={assets.star} alt='' className='w-6' />
                {parseFloat(product.avg_rating).toFixed(1) == 0
                  ? 'No ratings yet'
                  : parseFloat(product.avg_rating).toFixed(1)}
              </p>
            </div>
          ))}
        </div>
        <div className='moreProduct  text-center w-full my-20 md:my-10'>
          <a
            href='/allproduct'
            className=' p-4 bg-red-500  rounded-md  text-white'
          >
            View All Products
          </a>
        </div>
        <hr className='hr  border-[#7e7e7e]'></hr>
      </div>
      <div className='saleContents my-20 h-auto xs:my-5 md:my-10 md:px-3 '>
        <h4 className='text-[#ff2626] text-[17px] text-xl font-bold border-l-8  border-[#ff2626] pl-3'>
          Categories
        </h4>
        <div className='flashSaleTitle grid grid-cols-12 '>
          <h1 className='col-span-3   font-bold text-4xl xs:text-xl xs:col-span-6 md:text-2xl md:col-span-4 lg:text-4xl'>
            Browse By Category
          </h1>
        </div>
        <div className='displayCategory flex my-8 xs:grid xs:grid-cols-2 xs:gap-4 md:grid md:grid-cols-3 md:gap-5 md:place-content-center lg:flex'>
          {typeData.map(
            (type, index) =>
              index < 6 && (
                <>
                  {' '}
                  <a
                    href={`/catagory?c=${type.name}`}
                    className='grid place-items-center  h-[200px] w-[200px] border-2  rounded-md mr-4 xs:w-full xs:h-[150px] md:mr-0 md:h-56 md:w-full   '
                  >
                    <div className=' text-[25px]  text-center'>
                      <img src={type} alt='' className='w-12 m-auto' />
                      <p className='mt-2 '>{type.name}</p>
                    </div>
                  </a>
                </>
              )
          )}
        </div>

        <hr className='border-[#7e7e7e]'></hr>
      </div>
      <div className='bestSale my-20 h-auto xs:my-5 md:my-10'>
        <h4 className='text-[#ff2626] text-[17px] text-xl font-bold border-l-8  border-[#ff2626] pl-3'>
          This Month
        </h4>
        <div className='bestSaleMonth grid grid-cols-12 '>
          <h1 className='col-span-3 font-bold text-4xl xs:col-span-6 xs:flex xs:my-auto xs:text-lg md:text-2xl md:col-span-4 md:flex md:my-auto lg:text-4xl'>
            Best Selling Products
          </h1>
          <a
            href='/allproduct'
            className='col-end-13 col-span-1 text-center p-4 bg-red-500 text-white  rounded-md xs:p-2 xs:col-span-3 xs:col-start-10 md:col-start-11 '
          >
            View All
          </a>
        </div>
        <div className='slider-container md:block lg:hidden'>
          <Slider {...settings}>
            {newProduct.map(product => (
              <div className='cardProduct w-[25rem] md:h-full  h-auto mr-6 relative '>
                <img
                  src={`${API_HOST}/storage/${product.img}`}
                  alt=''
                  className='h-[300px] p-6'
                />
                <p className='py-4 px-2 text-white rounded-md font-semibold bg-red-600 w-[fit] max-w-[85px] h-3 absolute flex items-center   top-2 left-2 z-1'>
                  -
                  {(
                    ((product.price - product.saleprice) / product.price) *
                    100
                  ).toFixed(1)}
                  %
                </p>
                <div className='absolute z-1 top-2 right-2'>
                  <div className='bg-slate-300 rounded-full  w-7 h-7  relative mb-3'>
                    <a
                      href='/wishlist'
                      className='wishlist  absolute top-[25%] left-[20%]'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                        className='size-4'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z'
                        />
                      </svg>
                    </a>
                  </div>
                  <div className='bg-slate-300 rounded-full  w-7 h-7  relative mb-3'>
                    <a
                      href={`/detailproduct/${product.id}`}
                      className='view  absolute top-[25%] left-[20%]'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                        className='size-4'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z'
                        />
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
                        />
                      </svg>
                    </a>
                  </div>
                </div>
                <h3 className='text-[20px] font-bold h-[60px] max-h-[60px]'>
                  {product.namepd}
                </h3>
                <p className='text-red-600 font-semibold'>
                  ${product.saleprice}{' '}
                  <span className='text-[#7e7e7e] line-through'>
                    ${product.price}
                  </span>{' '}
                </p>
                <p className='flex gap-2 text-[18px] font-medium'>
                  <img src={assets.star} alt='' className='w-6' />
                  {parseFloat(product.avg_rating).toFixed(1) == 0
                    ? 'No ratings yet'
                    : parseFloat(product.avg_rating).toFixed(1)}
                </p>
              </div>
            ))}
          </Slider>
        </div>
        <div className='displayProduct flex space-x-4 xs:hidden md:hidden lg:flex lg:my-10'>
          {newProduct.map(product => (
            <div className='cardProduct w-[25rem] md:h-full  h-auto mr-6 relative '>
              <img
                src={`${API_HOST}/storage/${product.img}`}
                alt=''
                className='h-[300px] p-6'
              />
              <p className='py-4 px-2 text-white rounded-md font-semibold bg-red-600 w-[fit] max-w-[85px] h-3 absolute flex items-center   top-2 left-2 z-1'>
                -
                {(
                  ((product.price - product.saleprice) / product.price) *
                  100
                ).toFixed(1)}
                %
              </p>
              <div className='absolute z-1 top-2 right-2'>
                <div className='bg-slate-300 rounded-full  w-7 h-7  relative mb-3'>
                  <a
                    href='/wishlist'
                    className='wishlist  absolute top-[25%] left-[20%]'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth='1.5'
                      stroke='currentColor'
                      className='size-4'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z'
                      />
                    </svg>
                  </a>
                </div>
                <div className='bg-slate-300 rounded-full  w-7 h-7  relative mb-3'>
                  <a
                    href={`/detailproduct/${product.id}`}
                    className='view  absolute top-[25%] left-[20%]'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth='1.5'
                      stroke='currentColor'
                      className='size-4'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z'
                      />
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
                      />
                    </svg>
                  </a>
                </div>
              </div>
              <h3 className='text-[20px] font-bold h-[60px] max-h-[60px]'>
                {product.namepd}
              </h3>
              <p className='text-red-600 font-semibold'>
                ${product.saleprice}{' '}
                <span className='text-[#7e7e7e] line-through'>
                  ${product.price}
                </span>{' '}
              </p>
              <p className='flex gap-2 text-[18px] font-medium'>
                <img src={assets.star} alt='' className='w-6' />
                {parseFloat(product.avg_rating).toFixed(1) == 0
                  ? 'No ratings yet'
                  : parseFloat(product.avg_rating).toFixed(1)}
              </p>
            </div>
          ))}
        </div>

        <hr className='border-[#7e7e7e]'></hr>
      </div>
      <div className='Featured my-24 h-auto xs:my-6 md:my-12'>
        <h4 className='text-[#ff2626] text-[17px] text-xl font-bold border-l-8  border-[#ff2626] pl-3'>
          Featured
        </h4>
        <div className='bestSaleMonth grid grid-cols-12 '>
          <h1 className='col-span-3   font-bold text-4xl xs:col-span-6 xs:text-2xl md:text-2xl lg:text-4xl'>
            New Arrival
          </h1>
        </div>
        <div className='featureContent my-20 xs:my-5 md:my-10'>
          <div className='grid grid-cols-12 gap-6 xs:gap-1 md:gap-6'>
            <div className='row-span-2 col-span-6 bg-black relative '>
              <img src={assets.ps5} alt='' className='  h-full' />
              <div className='titleText grid absolute lg:bottom-10 lg:left-10 text-white gap-5 md:gap-0 md:bottom-5 md:left-5 xs:bottom-2 xs:left-2 xs:gap-0  '>
                <h3 className='font-semibold lg:text-3xl md:text-2xl xs:text-[0.85rem] '>
                  PlayStation 5
                </h3>
                <p className='font-extralight  lg:text-2xl lg:w-2/3 md:text-xl  xs:text-[10px] '>
                  Black and White version of the PS5 coming out on sale.
                </p>
                <a
                  href=''
                  className='lg:text-2xl underline decoration-gray-500 hover:decoration-white underline-offset-4 md:text-xl  xs:text-xs '
                >
                  Shop Now
                </a>
              </div>
            </div>

            <div className='row-span-1 col-span-6 bg-black relative '>
              <img src={assets.shopwomen} alt='' className=' h-full' />
              <div className='titleText grid absolute lg:bottom-10 lg:left-10 text-white gap-5 md:gap-0 md:bottom-2 md:left-2 xs:gap-0 xs:bottom-2 xs:left-2'>
                <h3 className='font-semibold lg:text-3xl  md:text-2xl xs:text-[10px]  '>
                  Women’s Collections
                </h3>
                <p className='font-extralight  lg:text-2xl w-2/3  md:text-base  xs:text-[8px]'>
                  Featured woman collections that give you another vibe.
                </p>
                <a
                  href=''
                  className='lg:text-2xl underline decoration-gray-500 hover:decoration-white underline-offset-4 xs:text-xs '
                >
                  Shop Now
                </a>
              </div>
            </div>
            <div className='row-span-1 col-span-3 bg-black relative '>
              <img src={assets.jblspeaker} alt='' className=' h-full' />
              <div className='titleText grid absolute lg:bottom-10 lg:left-10 text-white gap-2 md:bottom-2 md:left-2 md:gap-0 xs:gap-0 xs:bottom-2 xs:left-2'>
                <h3 className='font-semibold lg:text-2xl md:text-xl xs:text-[12px]'>
                  Speakers
                </h3>
                <p className='font-extralight  lg:text-xl md:text-xs xs:text-[10px]'>
                  Amazon wireless speakers
                </p>
                <a
                  href=''
                  className='text-2xl underline decoration-gray-500 hover:decoration-white underline-offset-4 md:text-xl xs:text-xs'
                >
                  Shop Now
                </a>
              </div>
            </div>
            <div className='row-span-1 col-span-3 bg-black relative '>
              <img src={assets.gucci} alt='' className=' h-full' />
              <div className='titleText grid absolute lg:bottom-10 lg:left-10 text-white gap-2 md:bottom-2 md:left-2 md:gap-0 xs:gap-0 xs:bottom-2 xs:left-2'>
                <h3 className='font-semibold lg:text-2xl  md:text-xl xs:text-[12px]  '>
                  Perfume
                </h3>
                <p className='font-extralight  lg:text-xl md:text-xs xs:text-[10px]'>
                  GUCCI INTENSE OUD EDP
                </p>
                <a
                  href=''
                  className='text-2xl underline decoration-gray-500 hover:decoration-white underline-offset-4 md:text-xl xs:text-xs '
                >
                  Shop Now
                </a>
              </div>
            </div>
          </div>
        </div>

        <hr className='border-[#7e7e7e]'></hr>
      </div>
      <div className='sthingAboutUs'>
        <Policy />
      </div>
    </div>
  )
}

export default HomePage
