import React from 'react'
import { assets } from '../../assets/assets'
import { product } from '../../assets/product/product'

function Wishlist () {
  return (
    <>
      <div className='px-24  py-16'>
        <div className='wlTitle flex justify-between'>
          <h1 className='text-2xl font-normal grid place-items-center'>
            Wishlist(4)
          </h1>
          <a
            href=''
            className='py-4 px-10 border font-semibold border-black rounded-md'
          >
            Move All To Bag
          </a>
        </div>
        <div className='grid grid-cols-5 gap-16 '>
          <div className='wlProduct grid my-16 h-56 '>
            <div className='cardProduct w-[300px] h-auto mr-6 relative '>
              <img src={assets.ps5} alt='' className='h-[300px]  rounded-lg' />
              <p className='p-4 text-white rounded-md font-light bg-red-600 w-[65px] h-3 absolute flex items-center   top-2 left-2 z-10'>
                -40%
              </p>
              <div className='absolute z-10 top-4 right-4'>
                <div className='bg-slate-300 rounded-full  w-8 h-8  relative mb-3'>
                  <a href='' className='  absolute top-[15%] left-[13%]'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke-width='1.5'
                      stroke='currentColor'
                      className='size-6'
                    >
                      <path
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        d='m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0'
                      />
                    </svg>
                  </a>
                </div>
              </div>
              <div className='absolute z-10 bottom-[10%]  w-full '>
                <div className='text-center bg-black  py-2  rounded-b-lg relative mb-3 '>
                  <a
                    href=''
                    className='add2Cart  text-white flex justify-center'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth='1.5'
                      stroke='currentColor'
                      className='size-6 mr-2'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z'
                      />
                    </svg>
                    Add To Cart
                  </a>
                </div>
              </div>
              <h3 className='text-[20px] font-bold'></h3>
              <p className='text-red-600 font-semibold'>
                $sale price
                <span className='text-[#7e7e7e] ml-3 line-through'>
                  $ price
                </span>
              </p>
              <p>Star Rating</p>
            </div>
          </div>
         
          
        </div>
      </div>
    </>
  )
}

export default Wishlist
