import React, { useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import Cookies from 'js-cookie'
import Empty from '../Emptypage/Emptypage'


function Cart () {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL_API; // Lấy từ .env
  const API_BASE = import.meta.env.VITE_API_BASE_URL; // Lấy từ .env
  const [dataCart, setdataCart] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const token = Cookies.get('authToken')


  const removeItem = async id => {
    try {
      console.log(id)

      const response = await fetch(
        `${API_BASE_URL}/deletecartid?id=${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      const data = await response.json()
      if (!data.success) {
        console.error(data.message)
      }
    } catch (error) {
      console.error(error)
    }
  }
  const fetchItemsCart = async () => {
    const response = await fetch(`${API_BASE_URL}/itemscart`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const data = await response.json()
    if (data.success) {
      setdataCart(data.data)
    } else {
      console.log(data)
    }
  }
  // const fetchGuestCart = async () => {
  //   const response = await fetch(`${API_BASE_URL}/itemscart`, {
  //     method: 'GET',
  //     headers: {
  //       Authorization: `Bearer ${token}`
  //     }
  //   })
  //   const data = await response.json()
  //   if (data.success) {
  //     setdataCart(data.data)
  //   } else {
  //     console.log(data)
  //   }
  // }
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchItemsCart()
    }, 1) // Delay 2 giây

    return () => clearTimeout(timer) // Cleanup để tránh memory leak
  })
  useEffect(() => {
    const total = dataCart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    )
    setTotalPrice(total)
  })
  const updateQuality = async (id, newQuantity) => {
    // const updateCart = dataCart.map(item =>
    //   item.product_id === id ? { ...item, quantity: newQuantity } : item
    // )
    // setdataCart(updateCart)
    const response = await fetch(`${API_BASE_URL}/updatecart/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ quantity: newQuantity })
    })
    const data = await response.json()
    if (data.success) {
      console.log('cart update successfully')
    } else {
      console.log('fail to update')
    }
  }
  const updateCartBtn = () => {
    dataCart.forEach(async item => {
      await updateQuality(item.product_id, item.quantity)
    })
  }
  return (
    <>
      <div className='xl:px-36 xl:my-8 lg:px-12 lg:my-4 md:my-4 md:px-6 sm:px-3  xs:my-2  xs:px-3'>
        {dataCart.length === 0 || dataCart === null ? (
          <>
            <Empty />
          </>
        ) : (
          <>
            <div className='cartContent '>
              <div className='cartTitle  grid grid-cols-8 border py-4 px-8'>
                <p className='col-span-2'>Product</p>
                <p className='col-span-2 place-self-center'>Price</p>
                <p className='col-span-2 place-self-center'>Quantity</p>
                <p className='col-span-2 l:justify-center  l:flex l:place-self-center  md:place-self-end '>
                  Subtotal
                </p>
              </div>
              <>
                {dataCart.map(item => (
                  <>
                    <div className='cartTitle relative   grid grid-cols-8 border xl:grid-cols-8 lg:py-4 lg:px-8 group my-8 md:py-2 md:px-4  xs:px-2 xs:my-2   '>
                      <Link className='col-span-2 flex hoverClose cursor-pointer '>
                        <p
                          onClick={() => removeItem(item.id)}
                          className=' removeItem absolute rounded-full bg-red-500 text-white w-3 h-3 p-3  xl:hidden group-hover:block lg:hidden lg:top-[-5%] lg:left-[-10px]  md:block md:top-[-9%] md:left-[-2%] md:w-3 md:h-3 md:p-3  xs:block xs:top-[-9%] xs:left-[-2%]  '
                        >
                          <p className='text-xs absolute top-[6%] left-[35%]'>
                            x
                          </p>
                        </p>
                        <Link to={`/detailproduct/${item.product_id}`}></Link>
                        <img
                          src={`${API_BASE}/storage/${item.img}`}
                          alt='img'
                          className='w-24 mr-5 xl:w-24 xs:w-12 xs:m-0'
                        />
                        <p className='place-content-center font-semibold lg:text-[13px] xs:text-[12px]'>
                          {item.namepd}
                        </p>
                      </Link>
                      <p className='col-span-2 place-self-center'>
                        $ {item.price}
                      </p>
                      <input
                        type='number'
                        className='col-span-2 place-self-center w-1/4 h-10 p-3 border rounded-md outline-none md:w-1/2 xs:w-full'
                        value={item.quantity}
                        min={1}
                        max={100}
                        onChange={e => {
                          const updateCart = dataCart.map(i =>
                            i.product_id === item.product_id
                              ? { ...i, quantity: e.target.value }
                              : i
                          ) // hàm này dùng map để fetch data từ datacart, sau đó
                          //dùng toán tử 3 ngôi để check điều kiện, cho 2 id bằng nhau
                          //để thực thi lệnh update số lượng của sản phẩm đang trỏ vào
                          setdataCart(updateCart)
                        }}
                      ></input>
                      <p className='xl:col-start-8 lg:me-auto lg:col-span-1 lg:justify-end lg:col-start-8  lg:align-self-end  lg:text-xl md:col-start-8 md:col-span-1 md:justify-center xs:col-span-2 xs:self-center xs:mx-auto '>
                        ${item.price * item.quantity}
                      </p>
                    </div>
                  </>
                ))}
              </>
            </div>
            <div className='flex justify-between'>
              <Link
                to=''
                className='py-3 px-8 border border-[#949494] rounded-md font-semibold'
              >
                Return To Shop
              </Link>
              <button
                href=''
                className='py-3 px-8 border border-[#949494] rounded-md font-semibold'
                onClick={() => updateCartBtn()}
              >
                Update Cart
              </button>
            </div>
            <div className='totalContent grid grid-cols-6 my-16 lg:grid-cols-7 md:gap-10 xs:gap-3 '>
              {/* <div className='couponPlace col-span-4 lg:col-span-3 md:col-span-6    xs:col-span-7    '>
            <form action='' className='flex md:gap-6'>
              <input
                type='text'
                className='lg:w-1/2 lg:mr-6 border border-[#949494] rounded-md outline-none p-3 focus:border-black xs:w-1/2'
                placeholder='Coupon Code'
              />
              <button className='bg-red-500 lg:h-12 lg:w-1/3 rounded-md text-white md:w-1/2 xs:w-1/2 '>
                Apply Coupon
              </button>
            </form>
          </div> */}

              <div className='totalPlace lg:col-start-5  border border-[#949494] rounded-md lg:py-8 lg:px-16 lg:col-span-4 md:px-12 md:py-8 md:col-span-6  xs:col-span-8'>
                <h1 className='mb-6 font-semibold text-xl'>Cart Total</h1>

                <div className='flex justify-between   border-[#494949] pb-2 '>
                  <p>Subtotal:</p>
                  <p>${totalPrice}</p>
                </div>

                <div className='flex justify-between border-b border-[#494949] pb-2 mt-2'>
                  <p>Shipping:</p>
                  <p>Free</p>
                </div>
                <div className='flex justify-between order-b border-[#494949] pb-6  mt-6'>
                  <p>Total</p>
                  <p>${totalPrice}</p>
                </div>
                <div className='w-full flex justify-center'>
                  <Link
                    to='/order'
                    className=' py-4 px-10 border rounded-md text-white bg-red-500'
                  >
                    Move to checkout
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default Cart
