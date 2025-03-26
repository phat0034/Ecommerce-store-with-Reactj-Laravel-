import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams, useParams } from 'react-router-dom'

const Allproduct = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL_API
  const API_BASE = import.meta.env.VITE_API_BASE_URL; // Lấy từ .env
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [currentPage, setCurrentPage] = useState(1)
  const [lastPage, setLastPage] = useState()
  const [dataProduct, setDataProduct] = useState([])
  const keyword = searchParams.get('s')
  let getCatagory = searchParams.get('c')
  let getPage = parseInt(searchParams.get('page'))
  const numPage = []
  const [sortOrder, setSortorder] = useState('asc')
  const fetchData = async (type, page, sort) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/producttype?type=${type}&page=${page}&sort=${sort}`
      )
      const fetchData = await response.json()

      if (fetchData.success) {
        setDataProduct(fetchData.data.data)
        setCurrentPage(fetchData.data.current_page)
        setLastPage(fetchData.data.last_page)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleSortChange = e => {
    setSortorder(e.target.value)
    fetchData(getCatagory, currentPage, sortOrder)
  }

  useEffect(() => {
    if (getPage > lastPage) {
      navigate(`?c=${getCatagory}&page=${lastPage}`)
      getPage = lastPage
    }
    fetchData(getCatagory, getPage, sortOrder)
  }, [keyword, currentPage, sortOrder])
  const handlePageChange = newPage => {
    window.scrollTo(0, 0)
    setCurrentPage(newPage)
    navigate(`?c=${getCatagory}&page=${newPage}`) // Thay đổi URL
  }
  //fetch number of pages
  for (let i = 1; i <= lastPage; i++) {
    numPage.push(i)
  }

  return (
    <>
      <h1 className='text-center mt-10 text-[60px] font-medium tracking-wider lg:mt-8 md:mt-6 sm:mt-4 xs:mt-4'>
        {getCatagory}
      </h1>
      <div className='px-24 pb-12 grid grid-cols-4  lg:px-12 md:grid-cols-4 md:px-6 sm:px-6  xs:px-6  '>
        <div className='product col-span-4 lg:px-6 lg:py-3 md:col-span-4'>
          <div className='sortMost grid place-content-end '>
            <select
              name='sort'
              id=''
              value={sortOrder}
              onChange={handleSortChange}
              className='border rounded-md p-2 '
            >
              <option value='0' selected>
                Sort Product
              </option>
              <option value='asc'>Low To High Price</option>
              <option value='desc'>High To Low Price</option>
              <option value='popular'>Most Popular</option>
            </select>
          </div>
          <div className='grid grid-cols-4 gap-4 my-4 md:grid-cols-4 sm:grid-cols-2  xs:grid-cols-2'>
            {dataProduct.map(product => (
              <div className='cardProduct lg:w-auto md:h-full  h-auto relative border rounded-lg shadow-lg p-3 '>
                <div className='flex justify-center'>
                  <div className='xl:h-[300px]  lg:h-[200px] sm:h-[150px]  xs:h-[120px] flex justify-center'>
                    <img
                      src={`${API_BASE}/storage/${product.img.replace(
                        / /g,
                        '-'
                      )}`}
                      alt=''
                      className=''
                    />
                  </div>
                </div>
                <p className='p-4 text-white rounded-md font-light bg-red-600 w-[65px] h-3 absolute flex items-center   top-2 left-2 z-10'>
                  -40%
                </p>
                <div className='absolute z-10 top-2 right-2'>
                  <div className='bg-slate-300 rounded-full  w-7 h-7  relative mb-3'>
                    <Link to='' className='  absolute top-[25%] left-[20%]'>
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
                    </Link>
                  </div>
                  <div className='bg-slate-300 rounded-full  w-7 h-7  relative mb-3'>
                    <Link
                      to={`/detailproduct/${product.id}`}
                      className='  absolute top-[25%] left-[20%]'
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
                    </Link>
                  </div>
                </div>
                <h3 className='text-[15px] font-bold'>{product.namepd}</h3>
                <p className='text-red-600 font-semibold flex gap-3'>
                  {product.saleprice > 0 ? (
                    <>
                      <span>{product.saleprice}$</span>
                      <span className='text-[#7e7e7e] line-through '>
                        {product.price}$
                      </span>
                    </>
                  ) : (
                    <span className='text-black '>{product.price}$</span>
                  )}
                </p>
                <p>Star Rating</p>
              </div>
            ))}
          </div>
          <div className='flex justify-center gap-2 mt-12'>
            <p
              className='border py-1 px-2 rounded-md hover:bg-black hover:text-white cursor-pointer'
              onClick={() => handlePageChange(1)}
            >
              First
            </p>
            <p
              className={`border py-1 px-2 rounded-md hover:bg-black hover:text-white ${
                currentPage === 1
                  ? 'cursor-not-allowed opacity-50'
                  : 'cursor-pointer'
              }`}
              onClick={() =>
                currentPage > 1 ? handlePageChange(currentPage - 1) : ''
              }
            >
              Prev
            </p>

            {numPage.map(index => (
              <p
                className={`border py-1 px-2 rounded-md cursor-pointer ${
                  currentPage === index ? 'bg-black text-white' : ''
                }`}
                onClick={() => handlePageChange(index)}
              >
                {index}
              </p>
            ))}
            <p
              className={`border py-1 px-2 rounded-md hover:bg-black hover:text-white ${
                currentPage === lastPage
                  ? 'cursor-not-allowed opacity-50'
                  : 'cursor-pointer'
              }`}
              onClick={() =>
                currentPage < lastPage && handlePageChange(currentPage + 1)
              }
            >
              Next
            </p>
            <p
              className='border py-1 px-2 rounded-md hover:bg-black hover:text-white cursor-pointer'
              onClick={() => handlePageChange(lastPage)}
            >
              Last
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
export default Allproduct
