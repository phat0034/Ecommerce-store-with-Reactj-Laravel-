import React from 'react'
import Sidebar from './Components/Sidebar/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Addproduct from './Components/AddProduct/Addproduct.jsx'
import Listproduct from './Components/ListProduct/Listproduct.jsx'
import Navbar from './Components/Navbar/Navbar'
import './App.css'
import Admin from './Pages/Admin/Admin.jsx'
export default function App () {
  return (
    <div>
        <Navbar/>
   
      <Admin/>
    
  
    </div>
  )
}
