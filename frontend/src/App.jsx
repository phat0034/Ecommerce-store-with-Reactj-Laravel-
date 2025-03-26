import './App.css'
import { Header } from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { Routes, Route, useLocation, HashRouter } from 'react-router-dom'
import { routes } from './routes'
import SignUp from './components/SignUp/SignUp'
import Cookies from 'js-cookie'
import SideBar from './components/Profile/SideBar'
import { useEffect } from 'react'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import './App.css'
function App () {
  const location = useLocation() // Lấy đường dẫn hiện tại

  // Kiểm tra nếu đường dẫn chứa "/profile", thì mới hiển thị Sidebar
  const showSidebar = location.pathname.startsWith('/myprofile')
  return (
    <>
      <Header />

      <Routes>
        {routes.map(route => (
          <Route key={route.path} path={route.path} element={<route.page />} />
        ))}
      </Routes>

      <Footer />
    </>
  )
}

export default App
