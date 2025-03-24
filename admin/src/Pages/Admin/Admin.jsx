import React from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Addproduct from '../../Components/AddProduct/Addproduct'
import Listproduct from '../../Components/ListProduct/Listproduct'
import OrderAdmin from '../../Components/OrderAdmin/OrderAdmin'
import UserAdmin from '../../Components/UserAdmin/UserAdmin'
import Navbar from '../../Components/Navbar/Navbar'
import { assets } from '../../../../frontend/src/assets/assets'
import ReviewAdmin from '../../Components/ReviewAdmin/ReviewAdmin'
import Dashboard from '../../Components/Dashboard/Dashboard'
import CouponAdmin from '../../Components/CouponAdmin/CouponAdmin'
function Admin () {
  return (
    <div className='adminPage flex gap-4'>
      <Sidebar />
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/addproduct' element={<Addproduct />} />
        <Route path='/listproduct' element={<Listproduct />} />
        <Route path='/usercontrol' element={<UserAdmin />} />
        <Route path='/ordercontrol' element={<OrderAdmin />} />
        <Route path='/reviewcontrol' element={<ReviewAdmin />} />
        <Route path='/coupon' element={<CouponAdmin />} />
      </Routes>
    </div>
  )
}

export default Admin
