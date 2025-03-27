import React, { useState } from 'react'
import { assets } from '../../../../frontend/src/assets/assets'
import { useEffect } from 'react'

function Addproduct () {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL_API; // Lấy từ .env
  const API_BASE = import.meta.env.VITE_API_BASE_URL; // Lấy từ .env
  const [image, setImage] = useState(false)
  const [productDetails, setProductDetails] = useState({
    name: '',
    price: '',
    saleprice: '0',
    type: '1',
    img: ''
  })

  const imageHandler = e => {
    setImage(e.target.files[0])
  }
  const changeHandler = e => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value })
  }
  const add_Product = async () => {
    let formData = new FormData()
    formData.append('name', productDetails.name)
    formData.append('price', productDetails.price)
    formData.append('saleprice', productDetails.saleprice)
    formData.append('type', productDetails.type)
    formData.append('img', image)
    console.log(formData)

    const responseData = await fetch(`${API_BASE_URL}/add`, {
      method: 'POST',
      headers: {
        Accept: 'application/json'
      },
      body: formData
    })
    let resp = await responseData.json()
    if (resp.success) {
      console.log('Upload thành công!', resp)
    } else {
      console.log('Lỗi:', resp)
    }
  }
  const [isProductClosed, setProductClosed] = useState('addproduct')
  const [randomStuff, setRandomStuff] = useState({
    toPrice: 1,
    fromPrice: 100,
    toSalePrice: 0,
    fromSalePrice: 0,
    amount: 50
  })
  const randomChangeHandler = e => {
    setRandomStuff({ ...randomStuff, [e.target.name]: e.target.value })

    console.log(randomStuff)
  }
  const add_BulkProduct = async () => {
    let amount = parseInt(randomStuff.amount)
    let count = 0
    let countFail = 0
    let toPrice = parseInt(randomStuff.toPrice)
    let fromPrice = parseInt(randomStuff.fromPrice)
    let toSalePrice = parseInt(randomStuff.toSalePrice)
    let fromSalePrice = parseInt(randomStuff.fromSalePrice)
    let isSuccess = false
    let formData = new FormData()
    for (let i = 1; i <= amount; i++) {
      if (countFail >= 2) {
        let randPrice = Math.floor(
          Math.random() * (fromPrice - toPrice) + toPrice
        )
        let randSale = Math.floor(
          Math.random() * (fromSalePrice - toSalePrice) + toSalePrice
        )
        let nameProduct = productDetails.name + ' ' + i

        formData.append('name', nameProduct)
        formData.append('price', randPrice)
        formData.append('saleprice', randSale)
        formData.append('type', productDetails.type)
        formData.append('img', image)
        const responseData = await fetch(`${API_BASE_URL}/add`, {
          method: 'POST',
          headers: {
            Accept: 'application/json'
          },
          body: formData
        })
        let resp = await responseData.json()
        if (resp.success) {
          count++
          isSuccess = true
          console.log('Upload thành công! Lần thứ : ', i, resp)
        } else {
          console.log('Lỗi:', resp)
          countFail++
        }
      } else {
        break
      }
    }
    if (amount === count) {
      alert('Đã up xong ' + amount + ' sản phẩm.')
    }
  }
  const logTest = () => {
    let toPrice = parseInt(randomStuff.toPrice)
    let fromPrice = parseInt(randomStuff.fromPrice)
    let toSalePrice = parseInt(randomStuff.toSalePrice)
    let fromSalePrice = parseInt(randomStuff.fromSalePrice)

    let rand = Math.floor(Math.random() * (25 - toPrice))
  }
  const [typeProduct, setTypeproduct] = useState({
    name: ''
  })
  const changeTabHandler = e => {
    setProductClosed(e)
  }
  const changeTypeHandler = e => {
    setTypeproduct({ ...typeProduct, [e.target.name]: e.target.value })
  }
  const addTypeProduct = async () => {
    const dataType = await fetch(`${API_BASE_URL}/addtype`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',

        Accept: 'application/json'
      },
      body: JSON.stringify(typeProduct)
    })
    const data = await dataType.json()
    if (data.success) {
      console.log(data.message)
    } else {
      console.log('lỗi khi add ' + data)
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
    getType()
  })

  return (
    <div className='addProduct w-[80%]   px-32 py-24 border'>
      <div className='flex  gap-3 mb-5  '>
        <div
          className={`border p-3 rounded-lg flex  justify-center  ${
            isProductClosed == 'addproduct' ? 'bg-black text-white' : ''
          }`}
          onClick={() => changeTabHandler('addproduct')}
        >
          Add Product
        </div>
        <div
          className={`border p-3 rounded-lg flex  justify-center ${
            isProductClosed == 'addtype' ? 'bg-black text-white' : ''
          }`}
          onClick={() => changeTabHandler('addtype')}
        >
          Add Type Product
        </div>
        <div
          className={`border p-3 rounded-lg flex  justify-center ${
            isProductClosed == 'addbulk' ? 'bg-black text-white' : ''
          }`}
          onClick={() => changeTabHandler('addbulk')}
        >
          Add Bulk Product
        </div>
      </div>
      {isProductClosed == 'addproduct' && (
        <>
          <div className='productTitle  '>
            <p className='text-2xl '>Product Title</p>
            <input
              value={productDetails.name}
              onChange={changeHandler}
              type='text'
              className='w-full p-4 border rounded-lg my-3'
              name='name'
            />
          </div>
          <div className='flex gap-5 '>
            <div className='productPrice w-full'>
              <p className='text-2xl '>Price</p>
              <input
                value={productDetails.price}
                onChange={changeHandler}
                type='number'
                className='w-full p-4 border rounded-lg my-3'
                name='price'
              />
            </div>
            <div className='productSalePrice w-full'>
              <p className='text-2xl '>Sale Price</p>
              <input
                value={productDetails.saleprice}
                onChange={changeHandler}
                type='number'
                className='w-full p-4 border rounded-lg my-3'
                name='saleprice'
              />
            </div>
          </div>
          <div className='productCategory'>
            <p className='text-2xl '>Product Category</p>
            <select
              name='type'
              id='cars'
              className='w-full p-4 border rounded-lg my-3'
              value={productDetails.type}
              onChange={changeHandler}
            >
              {listType.map(type => (
                <>
                  <option value={type.id}>{type.name}</option>
                </>
              ))}
            </select>
          </div>
          <div className='productImage w-fit'>
            <p className='text-2xl '>Product Image</p>
            <label htmlFor='fileInput'>
              <img
                src={image ? URL.createObjectURL(image) : assets.uploadimg}
                alt=''
                className='w-[150px] h-[130px]'
              />
            </label>
            <input
              type='file'
              name='img'
              id='fileInput'
              onChange={imageHandler}
              hidden
            />
          </div>
          <div className='flex  '>
            <button
              onClick={() => {
                add_Product()
              }}
              className='my-3  mx-auto border w-40 h-16 text-2xl bg-blue-400 text-white rounded-lg'
            >
              Add
            </button>
          </div>
        </>
      )}
      {isProductClosed == 'addtype' && (
        <>
          <div className='addTypeProduct'>
            <div className=' grid gap-3 mb-6'>
              <span className='my-auto'>Name of Catagory</span>
              <input
                type='text'
                className='border rounded-lg p-2 w-[30%]'
                name='name'
                value={typeProduct.name}
                onChange={changeTypeHandler}
              />
            </div>
            <button
              className='border rounded-md py-3 w-[15%] hover:bg-black hover:text-white'
              onClick={() => addTypeProduct()}
            >
              Add
            </button>
          </div>
        </>
      )}
      {isProductClosed == 'addbulk' && (
        <>
          <div className='productTitle  '>
            <p className='text-2xl '>Product Title</p>
            <input
              value={productDetails.name}
              onChange={changeHandler}
              type='text'
              className='w-full p-4 border rounded-lg my-3 '
              name='name'
            />
          </div>
          <div className='flex gap-5 '>
            <div className='productPrice w-full'>
              <p className='text-2xl '>Random Price</p>
              <div className=' flex gap-5'>
                <span className='m-auto'>To</span>
                <input
                  value={randomStuff.toPrice}
                  onChange={randomChangeHandler}
                  type='number'
                  className='w-full p-4 border rounded-lg my-3'
                  name='toPrice'
                />
                <span className='m-auto'>From</span>
                <input
                  value={randomStuff.fromPrice}
                  onChange={randomChangeHandler}
                  type='number'
                  className='w-full p-4 border rounded-lg my-3'
                  name='fromPrice'
                />
              </div>
            </div>
          </div>
          <div className='productPrice w-full'>
            {' '}
            <p className='text-2xl '>Random Sale Price</p>
            <div className='productSalePrice w-full'>
              <div className=' flex gap-5'>
                <span className='m-auto'>To</span>
                <input
                  value={randomStuff.toSalePrice}
                  onChange={randomChangeHandler}
                  type='number'
                  className='w-full p-4 border rounded-lg my-3'
                  name='toSalePrice'
                />
                <span className='m-auto'>From</span>
                <input
                  value={randomStuff.fromSalePrice}
                  onChange={randomChangeHandler}
                  type='number'
                  className='w-full p-4 border rounded-lg my-3'
                  name='fromSalePrice'
                />
              </div>
            </div>
          </div>

          <div className='productCategory'>
            <p className='text-2xl '>Product Category</p>
            <select
              name='type'
              id='cars'
              className='w-full p-4 border rounded-lg my-3'
              value={productDetails.type}
              onChange={changeHandler}
            >
              {listType.map(type => (
                <>
                  <option value={type.id}>{type.name}</option>
                </>
              ))}
            </select>
          </div>
          <div className=' gap-5'>
            <p className='m-auto text-2xl'>Amount to create</p>
            <input
              value={randomStuff.amount}
              onChange={randomChangeHandler}
              type='number'
              className='w-full p-4 border rounded-lg my-3'
              name='amount'
            />
          </div>
          <div className='productImage w-fit'>
            <p className='text-2xl '>Product Image</p>
            <label htmlFor='fileInput'>
              <img
                src={image ? URL.createObjectURL(image) : assets.uploadImg}
                alt=''
                className='w-[150px] h-[130px]'
              />
            </label>
            <input
              type='file'
              name='img'
              id='fileInput'
              onChange={imageHandler}
              hidden
            />
          </div>
          <div className='flex  '>
            <button
              onClick={() => {
                add_BulkProduct()
              }}
              className='my-3  mx-auto border w-40 h-16 text-2xl bg-blue-400 text-white rounded-lg'
            >
              Add
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default Addproduct
