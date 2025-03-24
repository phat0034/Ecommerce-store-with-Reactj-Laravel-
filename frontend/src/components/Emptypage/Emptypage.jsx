import React from 'react'
import { Link } from 'react-router-dom'

function Emptypage () {
  return (
    <>
      <div className='flex flex-col w-full items-center justify-center h-screen bg-gray-100 text-center px-6'>
        <svg
          className='w-24 h-24 text-gray-400 mb-4'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <circle
            cx='12'
            cy='12'
            r='10'
            stroke='currentColor'
            strokeWidth='2'
            fill='none'
          ></circle>
          <line
            x1='8'
            y1='12'
            x2='16'
            y2='12'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
          ></line>
        </svg>
        <h1 className='text-4xl font-bold text-gray-700'>Nothing Here</h1>
        <p className='text-gray-500 mt-2 max-w-md'>
          This page is currently empty. You might have taken a wrong turn or the
          content is yet to be added.
        </p>
        <Link
          to='/'
          className='mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg text-lg font-medium shadow hover:bg-blue-600 transition'
        >
          Go to Homepage
        </Link>
      </div>
    </>
  )
}

export default Emptypage
