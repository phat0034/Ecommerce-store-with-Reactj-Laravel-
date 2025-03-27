import React, { useEffect, useState } from 'react'
import { assets } from '../../../../frontend/src/assets/assets'
import Popup from 'reactjs-popup'
import '../../App.css'
import { useNavigate, useSearchParams, useParams } from 'react-router-dom'

function Listproduct () {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL_API; // Lấy từ .env
  const API_BASE = import.meta.env.VITE_API_BASE_URL; // Lấy từ .env
  const [allProducts, setAllProduct] = useState([])
  const [image, setImage] = useState(false)
  const [prodIdData, setprodIdData] = useState({})
  const [previewImg, setPreviewImg] = useState()
  const [searchParams] = useSearchParams()
  const [currentPage, setCurrentPage] = useState(1)
  const [lastPage, setLastPage] = useState()
  const navigate = useNavigate()
  const numPage = []
  const [query, setQuery] = useState('')
  let getPage = parseInt(searchParams.get('page'))
  // const fetchInfo = async () => {
  //   const response = await fetch('${API_BASE_URL}/allproduct')
  //   const data = await response.json() // Chuyển đổi thành JSON
  //   setAllProduct(data) // Cập nhật state với dữ liệu JSON
  //   console.log(data)
  //   console.warn(allProducts)
  // }

  const imageHandler = e => {
    setImage(e.target.files[0])
  }
  const editHandler = e => {
    setprodIdData({ ...prodIdData, [e.target.name]: e.target.value })
  }
  const clickHandlerData = item => {
    setprodIdData({ ...item })
  }
  const fetchData = async page => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/allproductpage?page=${page}&p=100`,
        {
          method: 'Post'
        }
      )
      const fetchData = await response.json()
      if (fetchData.success) {
        setAllProduct(fetchData.data.data)
        // console.log(currentPage);
        setCurrentPage(fetchData.data.current_page)
        setLastPage(fetchData.data.last_page) // API cần trả về last_page
      } else {
        console.error(fetchData.message)
      }
    } catch (error) {
      console.error(error)
    }
  }
  const fetchInfo = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/allproduct`)
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }
      const data = await response.json()

      // console.log('Dữ liệu từ API:', data.products) // Kiểm tra dữ liệu API
      setAllProduct(data.products)

      // console.log(allProducts)
    } catch (error) {
      console.error('Lỗi khi gọi API:', error)
    }
  }
  const editProduct = async id => {
    try {
      const formData = new FormData()
      formData.append('namepd', prodIdData.namepd)
      formData.append('price', prodIdData.price)
      formData.append('saleprice', prodIdData.saleprice)
      formData.append('idtype', prodIdData.idtype)
      formData.append('img', image)
      const response = await fetch(
        `${API_BASE_URL}/editproduct?id=${id}`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json'
          },
          body: formData
        }
      )
      const data = await response.json()

      // console.log(allProducts)
      if (data.success) {
        console.log(data)
        console.log(data.message)
      } else {
        console.error(data.message)
      }
    } catch (error) {
      console.error('Lỗi khi gọi API:', error)
    }
  }
  const removeProduct = async id => {
    const response = await fetch(`${API_BASE_URL}/delete?id=${id}`, {
      method: 'DELETE'
    })

    const data = await response.json()
    if (data.success) {
      console.log('Xóa thành công')
    } else {
      console.error(data.message)
    }
  }
  const findProduct = async value => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/findproduct?s=${value}`,
        {
          method: 'GET'
        }
      )
      const data = await res.json()
      if (data.success) {
        setAllProduct(data.data)
      }
    } catch (error) {
      console.error(error)
    }
  }
  const [listType, setlistType] = useState([])
  const getType = async () => {
    const dataType = await fetch(`${API_BASE_URL}/alltype`, {
      method: 'GET'
    })
    const allType = await dataType.json()
    setlistType(allType.data)
  }
  useEffect(() => {
    if (query.trim() == '') {
      if (getPage > lastPage) {
        navigate(`?page=${lastPage}`)
        getPage = lastPage
      }
      fetchData(getPage)
      getType()
    } else {
      findProduct(query)
    }
  }, [currentPage, prodIdData, query])

  // Chuyển trang và cập nhật URL
  const handlePageChange = newPage => {
    setCurrentPage(newPage)
    window.scrollTo(0, 0)
    navigate(`?page=${newPage}`) // Thay đổi URL
  }

  for (let i = 1; i <= lastPage; i++) {
    numPage.push(i)
  }
  useEffect(() => {
    if (!image) {
      setPreviewImg(undefined)
      return
    }
    const objUrl = URL.createObjectURL(image)
    setPreviewImg(objUrl)

    return () => URL.revokeObjectURL(objUrl)
  }, [image]) //

  return (
    <>
      <div className='flex-1 p-6'>
        <div className='bg-white p-6 rounded-lg shadow-lg'>
          <div className='my-4'>
            {' '}
            <span>Search Product: </span>
            <input
              type='text'
              className='border shadow-md  focus:outline-none focus:border-blue-300 rounded-lg px-3'
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
          </div>
          <div class='relative overflow-x-auto shadow-md sm:rounded-lg  max-h-[700px]'>
            <table class='w-full text-sm text-left rtl:text-right text-gray-500   '>
              <thead class='text-xs text-gray-700 uppercase bg-gray-50 '>
                <tr>
                  <th scope='col' class='px-6 py-3'>
                    ID
                  </th>
                  <th scope='col' class='px-6 py-3'>
                    Image
                  </th>
                  <th scope='col' class='px-6 py-3'>
                    Name Product
                  </th>
                  <th scope='col' class='px-6 py-3'>
                    Price
                  </th>
                  <th scope='col' class='px-6 py-3'>
                    Sale Price
                  </th>
                  <th scope='col' class='px-6 py-3'>
                    Category
                  </th>
                  <th scope='col' class='px-6 py-3'>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {allProducts.map((item, key) => (
                  <>
                    <tr
                      class='odd:bg-white even:bg-gray-50  border-b  border-gray-200  '
                      key={key}
                    >
                      <th
                        scope='row'
                        class='px-6 py-4 font-medium text-gray-900 whitespace-nowrap  '
                      >
                        #{item.id}
                      </th>
                      <td class='px-6 py-4'>
                        <img
                          src={`${API_BASE}/storage/${item.img}`}
                          alt=''
                          className='w-20 h-20'
                        />
                      </td>
                      <td class='px-6 py-4'>{item.namepd}</td>
                      <td class='px-6 py-4'>
                        <div className='flex'>
                          <p className=' '>${item.price}</p>
                        </div>
                      </td>
                      <td class='px-6 py-4'>${item.saleprice}</td>
                      <td class='px-6 py-4'>{item.idtype}</td>
                      <td class='px-6 py-4  h-full  '>
                        <div className='flex gap-2'>
                          <Popup
                            onOpen={() => clickHandlerData(item)}
                            trigger={
                              <button className='button'>
                                <div className=' cursor-pointer '>
                                  <img
                                    src={assets.editicon}
                                    alt=''
                                    className='w-5 color-red-500'
                                  />
                                </div>
                              </button>
                            }
                            modal
                            nested
                            contentStyle={{
                              width: '30%'

                              // overflowY: 'auto',
                              // overflowX: 'hidden'
                            }}
                          >
                            {close => (
                              <div className='modal p-6  relative  '>
                                <button
                                  className='close text-[15px] font-bold absolute top-[-7%] right-[-15px] border bg-gray-300 text-red-500 rounded-full block px-[10px] py-[5px]  '
                                  onClick={close}
                                >
                                  X
                                </button>
                                <h1 className='header text-2xl mb-3 '>
                                  Edit Product
                                </h1>
                                <div className='content '>
                                  <div className='grid grid-cols-3 my-4 '>
                                    <p className='my-auto'>Name Product</p>
                                    <input
                                      name='namepd'
                                      value={prodIdData.namepd}
                                      type='text'
                                      onChange={editHandler}
                                      className=' col-span-2  border border-gray-400 px-3 py-1 focus:border-blue-400 focus:outline-none rounded-md shadow-lg '
                                    />
                                  </div>
                                  <div className='grid grid-cols-3 my-4 '>
                                    <p className='my-auto'>Price</p>
                                    <input
                                      name='price'
                                      value={prodIdData.price}
                                      type='number'
                                      min='1'
                                      onChange={editHandler}
                                      className=' col-span-2  border border-gray-400 px-3 py-1 focus:border-blue-400 focus:outline-none rounded-md shadow-lg '
                                    />
                                  </div>
                                  <div className='grid grid-cols-3  my-4'>
                                    <p className='my-auto'>Sale Price</p>
                                    <input
                                      name='saleprice'
                                      value={prodIdData.saleprice}
                                      type='number'
                                      min='0'
                                      onChange={editHandler}
                                      className=' col-span-2  border border-gray-400 px-3 py-1 focus:border-blue-400 focus:outline-none rounded-md shadow-lg '
                                    />
                                  </div>{' '}
                                  <div className='grid grid-cols-3 my-4 '>
                                    <p className='my-auto'>Category</p>
                                    <select
                                      name='idtype'
                                      id=''
                                      value={prodIdData.idtype}
                                      onChange={e => {
                                        setprodIdData({
                                          ...prodIdData,
                                          [e.target.name]: e.target.value
                                        })
                                        console.log(prodIdData)
                                      }}
                                    >
                                      {listType.map(type => (
                                        <option value={type.id}>
                                          {type.name}
                                        </option>
                                      ))}
                                    </select>
                                    {/* <input
                                      name='idtype'
                                      value={prodIdData.idtype}
                                      type='text'
                                      onChange={editHandler}
                                      className=' col-span-2  border border-gray-400 px-3 py-1 focus:border-blue-400 focus:outline-none rounded-md shadow-lg '
                                    /> */}
                                  </div>
                                  <div className='grid grid-cols-3 my-4 '>
                                    <p className='my-auto'>Image</p>
                                    <div className='imageInput'>
                                      <label htmlFor='fileInput'>
                                        <img
                                          src={
                                            previewImg
                                              ? previewImg
                                              : assets.uploadimg
                                          }
                                          alt=''
                                          className='w-28 h-32'
                                        />
                                      </label>
                                      <input
                                        hidden
                                        name='address'
                                        id='fileInput'
                                        type='file'
                                        onChange={imageHandler}
                                        className=' col-span-2  border border-gray-400 px-3 py-1 focus:border-blue-400 focus:outline-none rounded-md shadow-lg '
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div className='actions flex justify-end'>
                                  <button
                                    onClick={async () => {
                                      await editProduct(item.id)
                                      
                                      close()
                                    }}
                                    className=' border rounded-md px-6 py-2 hover:bg-black hover:text-white'
                                  >
                                    Add
                                  </button>
                                </div>
                              </div>
                            )}
                          </Popup>
                          {/* <p
                            className='h-full cursor-pointer'
                            onClick={() => removeProduct(item.id)}
                          >
                            <img
                              src={assets.deleteicon}
                              alt=''
                              className='w-5'
                            />
                          </p> */}
                        </div>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
            {!query && (
              <div className='flex justify-center gap-2 my-4'>
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
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Listproduct
