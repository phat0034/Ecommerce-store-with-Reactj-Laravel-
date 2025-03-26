import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams, useParams } from 'react-router-dom'

const SearchProduct = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL_API; // Lấy từ .env
  const API_BASE = import.meta.env.VITE_API_BASE_URL; // Lấy từ .env
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [currentPage, setCurrentPage] = useState(1)
  const [lastPage, setLastPage] = useState()
  const [dataProduct, setDataProduct] = useState(false)
  const [dataType, setTypedata] = useState([])
  const [filters, setFilters] = useState({
    categories: [],
    brands: []
  })
  const keyword = searchParams.get('s')
  let getPage = parseInt(searchParams.get('page'))

  const numPage = []
  const [sortOrder, setSortorder] = useState('asc')
  const pushOptionArray = (type, value) => {
    setFilters(prev => {
      const prevValues = Array.isArray(prev[type]) ? prev[type] : [] // ✅ Đảm bảo pre
      const updateArray = prevValues.includes(value)
        ? prev[type].filter(item => item !== value)
        : [...prev[type], value]
      setDataProduct(null)
      return { ...prev, [type]: updateArray }
    })
    console.log(filters)
  }
  const fetchData = async (search, page, sort) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/searchproduct?s=${search}&page=${page}&sort=${sort}&p=12`,
        {
          method: 'post',
          headers: {
            Accept: '*/*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(filters)
        }
      )
      const fetchData = await response.json()
      if (fetchData.success) {
        setDataProduct(fetchData.data.data)

        setCurrentPage(fetchData.data.current_page)
        setLastPage(fetchData.data.last_page)
      } else {
        console.error(data.data)
      }
    } catch (error) {}
  }
  const getType = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/alltype`)
        .then(response => response.json())
        .then(data => {
          setTypedata(data.data)
        })
    } catch (error) {
      console.error(error)
    }
  }
  const handleSortChange = e => {
    setSortorder(e.target.value)
    fetchData(currentPage, sortOrder)
    setDataProduct(null)
  }

  useEffect(() => {
    if (getPage > lastPage) {
      navigate(`?s=${keyword}&page=${lastPage}`)
      getPage = lastPage
    }
    fetchData(keyword, getPage, sortOrder)
    getType()
  }, [keyword, currentPage, sortOrder, filters])
  const handlePageChange = newPage => {
    window.scrollTo(0, 0)
    setCurrentPage(newPage)
    if (searchParams.has('s')) {
      navigate(`?s=${keyword}&page=${newPage}`) // Thay đổi URL
    }
    setDataProduct(null)
  }
  //fetch number of pages
  for (let i = 1; i <= lastPage; i++) {
    numPage.push(i)
  }

  return (
    <>
      <div className='xl:px-24 xl:py-12 grid grid-cols-5 lg:px-12 lg:py-6 md:px-12 md:py-6 '>
        <div className='filterPlace  h-fit lg:px-4  border rounded-xl lg:block md:hidden sm:hidden xs:hidden  '>
          {/* <div className='priceFilter border-b-2 pb-3 '>
            <h1 className='lg:text-2xl lg:font-semibold lg:my-3 '>Price</h1>
            <div>
              <ul className='grid gap-2 lg:text-xl'>
                <li className='flex '>
                  <input type='checkbox' className='mr-3' />
                  <p>10$ </p>
                </li>
                <li className='flex '>
                  <input type='checkbox' className='mr-3' />
                  <p>20$</p>
                </li>
                <li className='flex '>
                  <input type='checkbox' className='mr-3' />
                  <p>30$</p>
                </li>
                <li className='flex '>
                  <input type='checkbox' className='mr-3' />
                  <p>40$</p>
                </li>

                <li className='flex '>
                  <input type='checkbox' className='mr-3' />
                  <p>50$ +</p>
                </li>
              </ul>
            </div>
          </div> */}
          <div className='typeFilter '>
            <h1 className='lg:text-2xl lg:font-semibold lg:my-3 '>
              Product Type
            </h1>
            <div>
              <ul className='grid gap-2 lg:text-xl'>
                {dataType.map(type => (
                  <li className='flex '>
                    <input
                      type='checkbox'
                      className='mr-3'
                      value={type.id}
                      onChange={() =>
                        pushOptionArray('categories', type.id.toString())
                      }
                      checked={filters.categories.includes(type.id.toString())}
                    />
                    <p>{type.name} </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className='product col-span-4 px-6 py-3 lg:col-span-4 md:col-span-5 xs:col-span-5'>
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

          {dataProduct === null ? (
            <div role='status ' className='flex justify-center h-[60vh]  '>
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
            <>
              {' '}
              <div className='grid grid-cols-4 gap-4 my-4 lg:grid-cols-3 md:grid-cols-2  sm:grid-cols-1 xs:grid-cols-1'>
                {dataProduct &&
                  dataProduct.map(product => (
                    <div className='cardProduct lg:w-auto  md:h-full  h-auto relative border rounded-lg shadow-lg p-3 '>
                      <div className='xl:h-[300px]  lg:h-[200px] sm:h-[150px]  xs:h-[120px] flex justify-center'>
                        <img
                          src={`${API_HOST}/storage/${product.img.replace(
                            / /g,
                            '-'
                          )}`}
                          alt=''
                          className=''
                        />
                      </div>
                      <p className='p-4 text-white rounded-md font-light bg-red-600 w-[65px] h-3 absolute flex items-center   top-2 left-2 z-1'>
                        -40%
                      </p>
                      <div className='absolute z-1 top-2 right-2'>
                        <div className='bg-slate-300 rounded-full  w-7 h-7  relative mb-3'>
                          <a
                            href=''
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
                                d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z'
                              />
                            </svg>
                          </a>
                        </div>
                        <div className='bg-slate-300 rounded-full  w-7 h-7  relative mb-3'>
                          <a
                            href={`/detailproduct/${product.id}`}
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
                          </a>
                        </div>
                      </div>
                      <h3 className='text-[15px] font-bold'>
                        {product.namepd}
                      </h3>
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
            </>
          )}
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
export default SearchProduct
