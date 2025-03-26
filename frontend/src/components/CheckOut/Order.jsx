import React, { useEffect, useState, useRef } from 'react'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import '../../../src/App.css'
function Order () {
  const API_HOST = import.meta.env.VITE_API_BASE_URL_API
  const API_BASE = import.meta.env.VITE_API_BASE_URL; // Lấy từ .env
  const navigate = useNavigate()
  const token = Cookies.get('authToken')
  const [dataCart, setDataCart] = useState([])
  const [selectedId, setSelectedId] = useState(null)
  const [isChecked, setIsChecked] = useState(false)

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked)
  }
  const stylespaypalbtn = {
    shape: 'rect',
    layout: 'vertical',
    color: 'gold',
    label: 'checkout'
  }
  const initialOptions = {
    'client-id':
      'AaELvk8aLuYH_hzSj6lFphUSYvTpdX8YfhNJCDE9u3Jt8v2Zuyfmses1Kn556qCRfYDg295dwnY4jpDK',
    'enable-funding': '',
    'disable-funding': '',
    'buyer-country': 'US',
    dataNamespace: 'paypal_sdk', // Adding this resolves potential conflicts
    currency: 'USD',
    'data-page-type': 'product-details',
    components: 'buttons',
    'data-sdk-integration-source': 'developer-studio'
  }
  const [message, setMessage] = useState('')
  const [couponCode, setCouponCode] = useState(0)
  const [applyCode, setApplyCode] = useState({
    code: ''
  })
  const [newAddress, setNewAddress] = useState(false)
  const [dataAddress, setDataAddress] = useState()
  const [idOrder, setIdOrder] = useState(null)
  const [orderData, setOrderData] = useState({
    name: '',
    address: '',
    email: '',
    phone: '',
    totalprice: 0,
    payment_method: 'cod',
    status: 'Pending'
  })
  const [addressData, setAdressData] = useState({
    title_address: '',
    name_address: '',
    address: '',
    email_address: '',
    phone_address: ''
  })
  const changeHandler = e => {
    setOrderData({ ...orderData, [e.target.name]: e.target.value })
  }
  const [errors, setErrors] = useState({}) // Lưu lỗi
  // Hàm kiểm tra form
  const validateForm = () => {
    let newErrors = {}

    if (!orderData.name.trim()) newErrors.name = 'Name is required!'
    if (!orderData.phone.trim()) newErrors.phone = 'Phone number is required!'
    if (!orderData.email.trim()) newErrors.email = 'Email is required!'
    if (!orderData.address.trim()) newErrors.address = 'Address is required!'

    // Kiểm tra định dạng email
    if (orderData.email && !/^\S+@\S+\.\S+$/.test(orderData.email)) {
      newErrors.email = 'Invalid email format!'
    }

    setErrors(newErrors) // Lưu lỗi

    return Object.keys(newErrors).length === 0 // Trả về true nếu không có lỗi
  }
  const [subTotal, setSubTotal] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  const [paymentMethod, setPaymentMethod] = useState({
    method: ''
  })
  const checkBanking = e => {
    setPaymentMethod(prev => ({ ...prev, method: e.target.value }))
  }
  const getdataCart = async () => {
    try {
      const response = await fetch(`${API_HOST}/itemscart`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      const data = await response.json()
      if (data.success) {
        setDataCart(data.data)
        // console.log(dataCart);

        if (data.data.length == 0) {
          navigate('/') // Chuyển hướng nếu có lỗi
        }
      } else {
        console.error(data.message)
      }
    } catch (error) {
      console.error('Lỗi API: ', error)
    }
  }
  const removeallCart = async () => {
    const response = await fetch(`${API_HOST}/deletecart`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    console.log(response)

    const data = await response.json()
    if (data.success) {
      console.log(data.message)

      // console.log(dataCart);
    } else {
      console.log(data.message)
    }
  }
  const getNearOrder = async () => {
    try {
      const response = await fetch(`${API_HOST}/nearorder`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const data = await response.json()
      if (data.success) {
        setIdOrder(data.data)
      } else {
        console.error(data.message)
      }
    } catch (error) {
      console.error('Lỗi API: ', error)
    }
  }
  const addAddress = async () => {
    try {
      const response = await fetch(`${API_HOST}/addaddress`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(addressData)
      })
      const data = await response.json()
      if (data.success) {
        console.log('add done')
        // setNewData(prevData => [...prevData, data.data])
        // setAdressData({
        //   // Reset form sau khi thêm
        //   title_address: '',
        //   name_address: '',
        //   address: '',
        //   email_address: '',
        //   phone_address: ''
        // })
      } else {
        console.error(data.message)
      }
    } catch (error) {
      console.error(error)
    }
  }
  const postdataOrder = async () => {
    await setAdressData(item => ({
      ...item,
      name_address: orderData.name,
      email_address: orderData.email,
      address: orderData.address,
      phone_address: orderData.phone
    }))
    if (validateForm()) {
      try {
        const response = await fetch(`${API_HOST}/addorder`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify(orderData)
        })

        const data = await response.json()
        if (data.success) {
          removeallCart()
          // ✅ Nếu isChecked == true thì gọi addAddress()
          if (isChecked) {
            await addAddress()
          }
          await getNearOrder()
          window.location.href = `/checkout/${idOrder}`
        } else {
          console.error(data.message)
        }
      } catch (error) {
        console.error('Faild to fetch API: ', error)
      }
    }
  }
  const getAddress = async () => {
    try {
      const response = await fetch(`${API_HOST}/showaddress`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      if (data.success) {
        setDataAddress(data.data)
      } else {
        console.error(data.message)
      }
    } catch (error) {
      console.error(error)
    }
  }
  const setAddressToDelivery = item => {
    setOrderData(prevData => ({
      ...prevData,
      name: item.name_address,
      address: item.address_delevery,
      email: item.email_address,
      phone: item.phone_address
    }))
    console.log(orderData)
  }
  const [orderId, setOrderId] = useState(null)

  // Gửi yêu cầu tạo order lên Laravel
  const createOrder = async () => {
    if (validateForm()) {
      console.log('✅ Form hợp lệ! Tiếp tục bước tiếp theo...')
      try {
        const response = await fetch(
          `${API_HOST}/paypal/create-order`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ total: totalPrice }) // Fixed test amount
          }
        )

        const data = await response.json()
        setOrderId(data.id)
        console.log(data.id)

        return data.id
      } catch (error) {
        console.error('Lỗi khi tạo đơn hàng:', error)
      }
    } else {
    }
  }

  // Xử lý thanh toán thành công
  const onApprove = async (data, actions) => {
    // Show loading state to user
    if (validateForm()) {
      console.log('✅ Form hợp lệ! Tiếp tục bước tiếp theo...')
      try {
        // First, capture the order on PayPal's side
        const response = await fetch(
          `${API_HOST}/paypal/capture-order/${data.orderID}`,
          {
            method: 'post',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({}) // Send an empty JSON body
          }
        )

        const paymentData = await response.json()
        console.log('PayPal capture response:', paymentData)

        // Check if the payment was captured successfully
        if (paymentData.status === 'COMPLETED') {
          // Update order payment method
          setOrderData({
            ...orderData,
            payment_method: 'paypal',
            paypal_order_id: data.orderID
          })

          // Submit the order to your system
          await postdataOrder()
          window.location.href = '/'
          // Show success message
          setMessage('Thanh toán thành công! Đơn hàng của bạn đang được xử lý.')
        } else {
          // Handle cases where capture was not successful
          console.error('PayPal capture failed:', paymentData)
          setMessage('Có lỗi xảy ra khi xử lý thanh toán. Vui lòng thử lại.')
        }
      } catch (error) {
        console.error('Payment processing error:', error)
        setMessage('Không thể xử lý thanh toán. Vui lòng thử lại sau.')
      }
    } else {
      console.log('❌ Form không hợp lệ! Vui lòng kiểm tra lại.')
    }
  }
  useEffect(() => {
    if (idOrder !== null) {
      window.location.href = `/checkout/${idOrder}`
      localStorage.setItem('temp_order', idOrder)
    }
  }, [idOrder]) // Chạy khi idOrder thay đổi
  const getCouponCode = async () => {
    try {
      const response = await fetch(`${API_HOST}/applycp`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(applyCode)
      })
      const data = await response.json()
      if (data.success) {
        setCouponCode(Number(data.data))

        console.log(couponCode)
      } else {
        console.log(data.message)
      }
    } catch (error) {
      console.error('Lỗi API: ', error)
    }
  }
  // hàm để nghe khi người dùng chọn option ship ( cod hoặc chuyển khoản)
  // useEffect(() => {
  //   const handler = e => {
  //     if (menuRef.current && !menuRef.current.contains(e.target)) {
  //       setBanking(false)
  //     }
  //   }
  //   document.addEventListener('mousedown', handler)
  //   return () => {
  //     document.removeEventListener('mousedown', handler)
  //   }
  // }, [])
  // hàm này để fetch data từ cart và thêm vào mảng mới
  useEffect(() => {
    getdataCart()
    getAddress()
  }, [])
  // hàm này để cập nhật liên tục tính tổng của tất cả các món trong giỏ hàng
  useEffect(() => {
    const subtotal = dataCart.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    )
    setSubTotal(subtotal)
    setTotalPrice(subtotal + (subtotal * couponCode) / 100)
    setOrderData(prevOrder => ({
      ...prevOrder,
      totalprice: subtotal + (subtotal * couponCode) / 100,
      items: dataCart.map(item => ({
        product_id: item.id,
        quantity: item.quantity,
        product_name: item.namepd,
        product_price: item.price
      }))
    }))
  }, [dataCart, couponCode])

  return (
    <>
      <div className='px-24 xl:px-12 lg:px-12 xs:px-4'>
        <div className='grid grid-cols-2  gap-48 xl:gap-12  lg:gap-8 md:grid-cols-2 md:gap-8 xs:gap-2 xs:grid-cols-1 my-12'>
          <div className=''>
            <h1 className='text-2xl font-semibold mb-8'>Billing Details</h1>
            <div>
              <div className='flex gap-3 mb-4'>
                <p
                  className={`border-b rounded-lg shadow-xl px-8 py-4  hover:scale-110 ${
                    newAddress == false
                      ? 'scale-110 bg-white'
                      : 'bg-gray-200 hover:scale-110 hover:bg-white'
                  }`}
                  onClick={() => {
                    setNewAddress(false)
                  }}
                >
                  My Address
                </p>
                <p
                  onClick={() => {
                    setNewAddress(true)
                    setOrderData({
                      ...orderData,
                      name: '',
                      address: '',
                      email: '',
                      phone: ''
                    })
                    setSelectedId(null)
                  }}
                  className={`border-b rounded-lg shadow-xl px-8 py-4  hover:scale-110 ${
                    newAddress
                      ? 'scale-110 bg-white'
                      : 'bg-gray-200 hover:scale-110 hover:bg-white'
                  }`}
                >
                  New Address
                </p>
              </div>
              {newAddress ? (
                <>
                  <div className='newAddress'>
                    {/* Name Input */}
                    <div className='mb-6'>
                      <p className='mb-3'>
                        Name<span className='text-red-400'>*</span>
                      </p>
                      <input
                        name='name'
                        value={orderData.name}
                        onChange={changeHandler}
                        type='text'
                        className='border outline-none text-black bg-[#eeeeee] rounded-md w-full p-3'
                      />
                      {errors.name && (
                        <p className='text-red-500 text-sm mt-1'>
                          {errors.name}
                        </p>
                      )}
                    </div>
                    {/* Phone & Email */}
                    <div className='grid grid-cols-2'>
                      {/* Phone Input */}
                      <div className='pr-4'>
                        <p className='mb-3'>
                          Phone Number<span className='text-red-400'>*</span>
                        </p>
                        <input
                          name='phone'
                          value={orderData.phone}
                          onChange={changeHandler}
                          type='text'
                          className='border outline-none text-black bg-[#eeeeee] rounded-md w-full p-3'
                        />
                        {errors.phone && (
                          <p className='text-red-500 text-sm mt-1'>
                            {errors.phone}
                          </p>
                        )}
                      </div>

                      {/* Email Input */}
                      <div className='pl-4'>
                        <p className='mb-3'>
                          Email<span className='text-red-400'>*</span>
                        </p>
                        <input
                          name='email'
                          value={orderData.email}
                          onChange={changeHandler}
                          type='text'
                          className='border outline-none text-black bg-[#eeeeee] rounded-md w-full p-3'
                        />
                        {errors.email && (
                          <p className='text-red-500 text-sm mt-1'>
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>
                    {/* Address Input */}
                    <div className='mb-6'>
                      <p className='mb-3'>
                        Address<span className='text-red-400'>*</span>
                      </p>
                      <input
                        name='address'
                        value={orderData.address}
                        onChange={changeHandler}
                        type='text'
                        className='border outline-none text-black bg-[#eeeeee] rounded-md w-full p-3'
                      />
                      {errors.address && (
                        <p className='text-red-500 text-sm mt-1'>
                          {errors.address}
                        </p>
                      )}
                    </div>
                    {/* Checkbox */}
                    <div className='my-6 text-xl font-medium flex'>
                      <input
                        type='checkbox'
                        id='saveforNext'
                        className='mr-3 h-6 w-6'
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                      />
                      <label htmlFor='saveforNext' className='self-center'>
                        Save this information for faster check-out next time
                      </label>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className='max-h-[500px] overflow-x-auto'>
                    {dataAddress &&
                      dataAddress.map(address => (
                        <div
                          className={`p-4 rounded-lg shadow-md border-2 cursor-pointer transition-all my-4 ${
                            selectedId === address.id
                              ? 'border-blue-500 bg-blue-100'
                              : 'border-gray-200 bg-white'
                          }`}
                          onClick={async () => {
                            await setAddressToDelivery(address)
                            await setSelectedId(address.id)
                          }}
                        >
                          <h3 className='text-lg font-semibold text-gray-800'>
                            {address.title_address}
                          </h3>
                          <p className='text-gray-700 mt-2'>
                            <strong>👤 Người nhận:</strong>{' '}
                            {address.name_address}
                          </p>
                          <p className='text-gray-700'>
                            <strong>📍 Địa chỉ:</strong>{' '}
                            {address.address_delevery}
                          </p>
                          <p className='text-gray-700'>
                            <strong>📧 Email:</strong> {address.email_address}
                          </p>
                          <p className='text-gray-700'>
                            <strong>📞 SĐT:</strong> {address.phone_address}
                          </p>
                        </div>
                      ))}
                  </div>
                </>
              )}
            </div>
          </div>
          <div className='productContent'>
            <div className='pr-24 lg:p-0 xs:p-0'>
              {dataCart.map((item, index) => (
                <div className='productCart text-2xl' key={index}>
                  <div className='grid grid-cols-4  mb-6  '>
                    <div className=' flex col-span-2'>
                      <img
                        src={`${API_BASE}/storage/${item.img}`}
                        alt=''
                        className='w-16'
                      />
                      <p className=' mx-4  lg:text-lg xs:text-sm'>
                        {item.namepd}
                      </p>
                    </div>
                    <div className='flex place-items-center'>
                      <p className='m-auto justify-center flex text-[19px]'>
                        x {item.quantity}
                      </p>
                    </div>
                    <div className='place-content-end flex place-items-center'>
                      <p className='font-semibold'>
                        ${item.price * item.quantity}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              <div className='totalCart my-8'>
                <div className='grid grid-cols-2 border-b pb-3 border-b-[#747474] mb-6 text-2xl'>
                  <div className='titleText flex '>
                    <p className='place-content-center'>Subtotal: </p>
                  </div>
                  <div className=' priceText place-content-end flex place-items-center '>
                    <p className='font-semibold'>${subTotal}</p>
                  </div>
                </div>
                <div className='grid grid-cols-2 border-b pb-3 border-b-[#747474] mb-6 text-2xl'>
                  <div className='titleText flex '>
                    <p className='place-content-center'>Coupon: </p>
                  </div>
                  <div className=' priceText place-content-end flex place-items-center '>
                    <p className='font-semibold'>
                      ${(subTotal * couponCode) / 100}
                    </p>
                  </div>
                </div>
                <div className='grid grid-cols-2 border-b pb-3 border-b-[#747474] mb-6 text-2xl'>
                  <div className='titleText flex '>
                    <p className='place-content-center'>Shipping:</p>
                  </div>
                  <div className=' priceText place-content-end flex place-items-center '>
                    <p className='font-semibold'>Free</p>
                  </div>
                </div>
                <div className='grid grid-cols-2 pb-3 text-2xl'>
                  <div className='titleText flex '>
                    <p className='place-content-center'>Total:</p>
                  </div>
                  <div className=' priceText place-content-end flex place-items-center '>
                    <p className='font-semibold'>${totalPrice}</p>
                  </div>
                </div>
              </div>
              <div className='paymentMethod text-xl'>
                <div className='bankingMethod grid grid-cols-2 mb-4 '>
                  <div className='textContent flex relative  my-auto'>
                    <input
                      type='radio'
                      id='paypal'
                      name='methodPayment'
                      value={'paypal'}
                      className='mr-3 h-6 w-6 self-center  '
                      onChange={checkBanking}
                    />
                    <label htmlFor='paypal' className=''>
                      Paypal
                    </label>
                  </div>

                  <div className='imageContent place-content-end flex gap-4 self-center '>
                    <img
                      src={assets.paypal}
                      alt=''
                      className='w-auto  h-[48px]'
                    />
                    <img
                      src={assets.mastercard}
                      alt=''
                      className='w-auto  h-6  my-auto'
                    />
                    <img
                      src={assets.visa}
                      alt=''
                      className='w-auto  h-6 my-auto'
                    />
                  </div>
                </div>
                <div className='textContent flex '>
                  <input
                    type='radio'
                    id='cod'
                    name='methodPayment'
                    value={'cod'}
                    className='mr-3 h-6 w-6  self-center  '
                    onChange={checkBanking}
                    defaultChecked
                  />

                  <label htmlFor='cod'>Cash on delivery</label>
                </div>
              </div>
            </div>

            <div className='couponForm grid grid-cols-2 my-10 gap-8'>
              <input
                type='text'
                className='p-6 border  rounded-md'
                placeholder='Coupon Code'
                name='code'
                value={applyCode.code}
                onChange={e => {
                  setApplyCode({
                    ...applyCode,
                    [e.target.name]: e.target.value
                  })
                }}
              />
              <button
                className='bg-red-500 rounded-md text-white py-6'
                onClick={() => getCouponCode()}
              >
                Apply Coupon
              </button>

              <button
                className={`bg-red-500 rounded-md text-white py-6 w-full col-span-2 ${
                  paymentMethod.method === 'paypal' ? 'hidden' : ''
                }`}
                onClick={() => postdataOrder()}
              >
                Place Order
              </button>
            </div>
            <PayPalScriptProvider options={initialOptions}>
              <div className='w-full'>
                {/* Chỉ hiển thị PayPal button nếu chọn PayPal */}
                {paymentMethod.method === 'paypal' && (
                  <PayPalButtons
                    style={{ layout: 'vertical', height: 50 }}
                    createOrder={createOrder}
                    onApprove={onApprove}
                  />
                )}
              </div>
            </PayPalScriptProvider>
          </div>
        </div>
      </div>
    </>
  )
}

export default Order
