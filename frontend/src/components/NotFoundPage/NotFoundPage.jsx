import React from 'react'

const NotFoundPage = () => {
  return (
    <>
      <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
        <h1 className='text-7xl font-bold text-gray-800'>404</h1>
        <h2 className='text-2xl font-semibold text-gray-600 mt-2'>
          Oops! Page not found
        </h2>
        <p className='text-gray-500 mt-4 text-center max-w-md'>
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
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

export default NotFoundPage
