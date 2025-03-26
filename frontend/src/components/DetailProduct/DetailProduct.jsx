import React from 'react'
import { assets } from '../../assets/assets'
import LinkItems from '../linkItems/linkItems'
import { useNavigate, useSearchParams, useParams } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import Popup from 'reactjs-popup'
import { Rating } from 'react-simple-star-rating'
import Cookies from 'js-cookie'
import Empty from '../Emptypage/Emptypage'
function DetailProduct () {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL_API; // Lấy từ .env
  const API_BASE = import.meta.env.VITE_API_BASE_URL; // Lấy từ .env
  const token = Cookies.get('authToken')
  const { id } = useParams()
  const [dataProduct, setDataProduct] = useState(null)
  const [dataReview, setDataReview] = useState(null)
  const [dataCart, setDataCart] = useState({
    idproduct: id,
    quantity: 1
  })
  const [guestCart, setGuestCart] = useState([])

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || []
    setGuestCart(storedCart)
  }, [])
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    // Hàm cập nhật windowWidth khi cửa sổ thay đổi kích thước
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    // Lắng nghe sự kiện resize
    window.addEventListener('resize', handleResize)

    // Clean up khi component unmount
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  const changeHandler = e => {
    setDataCart({ ...dataCart, [e.target.name]: e.target.value })
  }

  const fetchDetailPD = async id => {
    try {
      const data = await fetch(`${API_BASE_URL}/detailproduct/${id}`)
      const finalData = await data.json()
      if (finalData.success) {
        // console.log('Final Data Type:', typeof finalData.data)

        setDataProduct([finalData.data])
      } else {
        console.log('Cannot fetch data: ', finalData)
      }
    } catch (error) {
      console.error('Fail to fetch: ', error)
    }
  }
  const fetchReview = async id => {
    try {
      setDataReview(null)
      const response = await fetch(
        `${API_BASE_URL}/getrwpd?id=${id}`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}` // Nếu API yêu cầu login
          }
        }
      )
      const finalData = await response.json()
      if (finalData.success) {
        // console.log('Final Data Type:', typeof finalData.data)
        console.log(dataReview)
        setDataReview(finalData.data)
      } else {
        console.log('Cannot fetch data: ', finalData)
      }
    } catch (error) {
      console.error('Fail to fetch: ', error)
    }
  }
  useEffect(() => {
    fetchDetailPD(id)
    console.log(dataProduct)
  }, [id])
  if (!dataProduct) {
    return <div>Loading...</div>
  }
  const name_cart = 'Cart_Items'
  // function getCart () {
  //   const cart = Cookies.get(name_cart)
  //   return cart ? JSON.parse(cart) : []
  // }

  const addtoCart = async () => {
    if (!token) {
      alert('U must to login')
      window.location.href = '/login'
    } else {
      try {
        const response = await fetch(`${API_BASE_URL}/addcart`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            accept: 'application/json'
          },
          body: JSON.stringify(dataCart)
        })
        const data = await response.json()
      } catch (error) {
        console.error(error)
      }
    }
  }
  const addtoWishlist = async id => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/addwl?id_product=${id}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            accept: 'application/json'
          }
        }
      )
      const data = await response.json()
      console.log(data.message)
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <>
      <div className='px-24 md:px-24 xs:px-4'>
        <div>
          <LinkItems />
        </div>
        {dataProduct.map(item => (
          <>
            <div className='grid grid-cols-2 gap-14 py-4 md:gap-14 xs:gap-4'>
              <div className='thumbImage grid gap-4 md:grid xs:flex xs:my-auto  '>
                <div className='xl:h-[400px]  md:h-[350px] sm:h-[250px]  xs:h-[200px] flex justify-center '>
                  <img
                    src={`${API_BASE}/storage/${item.img}`}
                    alt=''
                    className=''
                  />
                </div>
                {/* detail img */}
                {/* <div className='grid grid-cols-5 gap-4 md:grid xs:hidden '>
                  <div className='border'>
                    <img
                      src={assets.leftps}
                      alt=''
                      srcset=''
                      className='max-h-[150px]'
                    />
                  </div>
                  <div className='border'>
                    <img
                      src={assets.leftps}
                      alt=''
                      srcset=''
                      className='max-h-[150px]'
                    />
                  </div>{' '}
                  <div className='border'>
                    <img
                      src={assets.leftps}
                      alt=''
                      srcset=''
                      className='max-h-[150px]'
                    />
                  </div>{' '}
                  <div className='border'>
                    <img
                      src={assets.leftps}
                      alt=''
                      srcset=''
                      className='max-h-[150px]'
                    />
                  </div>{' '}
                  <div className='border'>
                    <img
                      src={assets.leftps}
                      alt=''
                      srcset=''
                      className='max-h-[150px]'
                    />
                  </div>
                </div> */}
              </div>
              <div className='col-span-1  '>
                <div className='inforProduct grid  gap-2 '>
                  <h1 className='text-2xl font-medium'>{item.namepd}</h1>
                  <div className='flex gap-2'>
                    <p className='flex gap-2 text-[18px] font-medium'>
                      <img src={assets.star} alt='' className='w-6' />
                      {parseFloat(item.avg_rating).toFixed(1) == 0
                        ? 'No ratings yet'
                        : parseFloat(item.avg_rating).toFixed(1)}
                    </p>
                    <div className='my-auto'>
                      <Popup
                        trigger={
                          <button className='button text-blue-700 text-[13px] underline '>
                            <p>{item.total_reviews}(reviews)</p>
                          </button>
                        }
                        modal
                        nested
                        onOpen={() => {
                          fetchReview(dataProduct[0].id)
                        }}
                      >
                        {close => (
                          <>
                            <button
                              className='text-[15px] font-bold absolute top-[-5%] right-[-15px] border bg-gray-300 text-red-500 rounded-full block px-[10px] py-[5px]  '
                              onClick={close}
                            >
                              X
                            </button>
                            <div className='overflow-y-auto max-h-[600px] px-4'>
                              {dataReview === null ||
                              dataReview.length === 0 ? (
                                <>
                                  <Empty />
                                </>
                              ) : (
                                <>
                                  {dataReview &&
                                    dataReview.map(rv => (
                                      <div className=' w-full  py-2'>
                                        <div className=' bg-white shadow-lg rounded-lg p-6 m-0 border-2 border-gray-200'>
                                          {/* User Info */}
                                          <div className='flex items-center mb-2'>
                                            <img
                                              src='https://i.pravatar.cc/50?img=3' // Avatar giả lập
                                              alt='User Avatar'
                                              className='w-12 h-12 rounded-full border-2 border-blue-500'
                                            />
                                            <div className='ml-3'>
                                              <h3 className='font-semibold text-lg text-gray-800'>
                                                {rv.name}
                                              </h3>
                                              <p className='text-xs text-gray-500'>
                                                {rv.created_at.split(' ')[0]}
                                              </p>
                                            </div>
                                          </div>

                                          {/* Star Rating */}
                                          <div
                                            className=' '
                                            style={{
                                              direction: 'ltr',
                                              fontFamily: 'sans-serif',
                                              touchAction: 'none'
                                            }}
                                          >
                                            <Rating
                                              SVGclassName={'inline-block'}
                                              initialValue={rv.rating}
                                              size={16}
                                              readonly
                                            />
                                          </div>

                                          {/* Review Content */}
                                          <p className='text-gray-700 leading-relaxed'>
                                            {rv.review}
                                          </p>
                                        </div>
                                      </div>
                                    ))}
                                </>
                              )}
                            </div>
                          </>
                        )}
                      </Popup>
                    </div>
                  </div>
                  <div className='flex gap-3 text-2xl'>
                    {item.saleprice > 0 ? (
                      <>
                        <p className='text-red-600 font-semibold'>
                          {item.saleprice}$
                        </p>
                        <p className='line-through text-gray-400'>
                          {item.price}$
                        </p>
                      </>
                    ) : (
                      <p className='font-semibold'>{item.price}$</p>
                    )}
                  </div>
                  <p className='max-w-[60%] mt-8 xl:max-w-[60%] lg:max-w-full md:max-w-full xs:max-w-full'>
                    PlayStation 5 Controller SKin High quality vinyl with air
                    channel adh for ez bubble free install{' '}
                  </p>
                </div>
                {windowWidth < 768 ? null : (
                  <>
                    <div className='xs:block width769'>
                      <div className='coloursProduct '></div>
                      <div className='sizeProduct'></div>
                      <div className='grid mt-16 md:mt-8 '>
                        <div className='quantityNumb my-3'>
                          <span>Số lượng </span>
                          <input
                            type='number'
                            value={dataCart.quantity || 1}
                            className='border-2 p-2 w-32 rounded-md ml-3'
                            name='quantity'
                            onChange={changeHandler}
                            min={1}
                          />
                        </div>
                        <div className='max-w-[50%] xl:max-w-[75%]  xs:max-w-full '>
                          <div>
                            <button
                              onClick={async () => {
                                await addtoCart()
                                window.location.href = '/Ecommerce-store-with-Reactj-Laravel-/order'
                              }}
                              className='w-full border text-lg px-32 py-4 rounded-lg hover:bg-black hover:text-white transition delay-75 duration-75 md:px-32 xs:px-8'
                            >
                              Buy Now
                            </button>
                          </div>
                          <div className='grid grid-cols-2 gap-3 mt-4'>
                            <div className='buyBtn w-full'>
                              <button
                                className='w-full border rounded-lg p-3 hover:bg-black hover:text-white transition delay-75 duration-75 '
                                onClick={() => {
                                  addtoCart()
                                }}
                              >
                                Add to cart
                              </button>
                            </div>
                            <div className='add2Wishlist'>
                              <button
                                className='w-full justify-center border rounded-lg p-3 flex hover:bg-black hover:text-white transition delay-75 duration-75 '
                                onClick={() => {
                                  addtoWishlist(id)
                                }}
                              >
                                Wishlist
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
              {windowWidth > 767 ? null : (
                <>
                  <div className='xs:col-span-2'>
                    <div className='coloursProduct'></div>
                    <div className='sizeProduct'></div>
                    <div className='grid grid-cols-'>
                      <div className='quantityNumb my-3 flex justify-center'>
                        <span className='my-auto'>Số lượng </span>
                        <input
                          type='number'
                          value={dataCart.quantity || 1}
                          className='border-2 p-2 w-32 rounded-md ml-3'
                          name='quantity'
                          onChange={changeHandler}
                        />
                      </div>
                      <div className='max-w-[50%] xl:max-w-[75%] xs:max-w-full'>
                        <div>
                          <button className='w-full border text-lg px-32 py-4 rounded-lg hover:bg-black hover:text-white transition delay-75 duration-75 md:px-32 xs:px-8'>
                            Buy Now
                          </button>
                        </div>
                        <div className='grid grid-cols-2 gap-3 mt-4'>
                          <div className='buyBtn w-full'>
                            <button
                              className='w-full border rounded-lg p-3 hover:bg-black hover:text-white transition delay-75 duration-75'
                              onClick={() => addtoCart()}
                            >
                              Add to cart
                            </button>
                          </div>
                          <div className='add2Wishlist'>
                            <button
                              className='w-full justify-center border rounded-lg p-3 flex hover:bg-black hover:text-white transition delay-75 duration-75'
                              onClick={() => {
                                addtoWishlist(id)
                              }}
                            >
                              Wishlist
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </>
        ))}
      </div>
    </>
  )
}

export default DetailProduct
