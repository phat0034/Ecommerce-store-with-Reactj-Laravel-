import HomePage from '../components/HomePage/HomePage'
import NotFoundPage from '../components/NotFoundPage/NotFoundPage'
import Login from '../components/login/login'
import SignUp from '../components/SignUp/SignUp'
import Wishlist from '../components/Wishlist/Wishlist'
import Cart from '../components/Cart/Cart'
import Order from '../components/CheckOut/Order'
import CheckOut from '../components/CheckOut/CheckOut'
import About from '../components/About/About'
import Allproduct from '../components/Product/Allproduct'
import DetailProduct from '../components/DetailProduct/DetailProduct'
import MyProfile from '../components/Profile/MyProfile'
import SideBar from '../components/Profile/SideBar'
import SearchProduct from '../components/Product/Searchproduct'
import CatagoryProduct from '../components/Catagory/CatagoryProduct'
import MyAddress from '../components/Profile/MyAddress'
import MyOrder from '../components/Profile/MyOrder'
import MyWishlist from '../components/Profile/MyWishlist'
import MyReview from '../components/Profile/MyReview'

export const routes = [
  {
    path: '/',
    page: HomePage
  },
  {
    path: 'home',
    page: HomePage
  },
  {
    path: '/myreview',
    page: MyReview
  },
  {
    path: '/catagory',
    page: CatagoryProduct
  },
  {
    path: '/mywishlist',
    page: MyWishlist
  },
  {
    path: '/myaddress',
    page: MyAddress
  },
  {
    path: '/myorder',
    page: MyOrder
  },
  {
    path: '/search',
    page: SearchProduct
  },

  {
    path: '/myprofile',
    page: MyProfile
  },
  {
    path: '/login',
    page: Login
  },
  {
    path: '/signup',
    page: SignUp
  },
  {
    path: '/wishlist',
    page: Wishlist
  },
  {
    path: '/cart',
    page: Cart
  },
  {
    path: '/order',
    page: Order
  },
  {
    path: '/checkout/:id',
    page: CheckOut
  },
  {
    path: '/about',
    page: About
  },
  {
    path: '/allproduct',
    page: Allproduct
  },
  {
    path: `/detailproduct/:id`,
    page: DetailProduct
  },
  {
    path: '*',
    page: NotFoundPage
  }
]
