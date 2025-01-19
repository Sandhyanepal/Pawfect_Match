import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import Layout from './component/Layout'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Adopt from './pages/Adopt'
import PetDesc from './pages/PetDesc'
import Login from './pages/Login'
import Register from './pages/Register'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setLoggedIn, setUserDetail } from './store/slice/loginStatusSlice'
import FAQ from './pages/FAQ'
import MeetForm from './pages/MeetForm'
import PetShop from './pages/PetShop'
import Shops from './pages/Shops'
import ShopCategory from './pages/ShopCategory'
import Product from './pages/Product'
import Cart from './pages/Cart'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import SingleProduct from './pages/SingleProduct'
import { setCart } from './store/slice/cartSlice'
import Test from './pages/Test'
import VerifyEmail from './pages/VerifyEmail'
import ForgetPassword from './pages/ForgetPassword'
import ResetPassword from './pages/ResetPassword'

const MyRoutes = () => {
  const dispatch = useDispatch()
  const { isLoggedIn } = useSelector((state) => state.loginStatus)
  const userId = useSelector((state) => state.loginStatus.userDetail._id)
  const [showPreferencesModal, setShowPreferencesModal] = useState(false)
  const [preferences, setPreferences] = useState({
    age: '',
    gender: '',
    breed: '',
    category: '',
    vaccination_status: false,
  })

  const [category, setCategory] = useState([])
  const [breed, setBreed] = useState([])

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem('authToken')
      if (!token) {
        return
      }
      const response = await axios(
        `${import.meta.env.VITE_BACKEND_URL}/get-user-by-id`,
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      )
      if (response.data.success) {
        const user = response.data.data
        const detail = response.data.userData
        dispatch(setLoggedIn(true))
        dispatch(setUserDetail({ ...user, detail }))
        const { preferences } = user

        // Check if the user needs to set preferences
        if (!preferences || !preferences.breed || !preferences.category) {
          setShowPreferencesModal(true) // Show preferences modal
        }
      } else {
        dispatch(setLoggedIn(false))
        dispatch(setUserDetail({}))
      }
    }
    fetchUserDetails()
  }, [dispatch, isLoggedIn])

  useEffect(() => {
    if (isLoggedIn) {
      const fetchAllCategory = async () => {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/getallcategory`
        )
        if (response.status === 200) {
          setCategory(response.data) // Set categories
        } else {
          toast.error('Error fetching categories')
        }
      }

      const fetchAllBreed = async () => {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/getallbreed`
        )
        if (response.status === 200) {
          setBreed(response.data) // Set breeds
        } else {
          toast.error('Error fetching breeds')
        }
      }

      const fetchCartItems = async () => {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/get-cart/${userId}`
        )
        dispatch(setCart(response.data.cart.items))
      }
      fetchCartItems()
      fetchAllBreed()
      fetchAllCategory()
    }
  }, [isLoggedIn])

  const handlePreferenceChange = (e) => {
    const { name, value, type, checked } = e.target
    setPreferences({
      ...preferences,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  const handlePreferenceSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/updatepreferences`,
        { userId, preferences }
      )
      if (response.status === 200) {
        dispatch(
          setUserDetail({ ...response.data.user, needsPreferences: false })
        )
        toast.success('Preferences updated successfully!')
        setShowPreferencesModal(false)
      } else {
        toast.error('Failed to update preferences.')
      }
    } catch (error) {
      toast.error('Error saving preferences. Please try again.')
      console.log(error.response)
    }
  }

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Test />} />
          <Route path="/adopt" element={<Adopt />} />
          <Route path="/pet/:id" element={<PetDesc />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-email/:token" element={<VerifyEmail />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="/meetform" element={<MeetForm />} />
          <Route path="/petshop" element={<PetShop />} />
          <Route path="/shops" element={<Shops />} />
          <Route path="/mens" element={<ShopCategory category="men" />} />
          <Route path="/womens" element={<ShopCategory category="women" />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<SingleProduct />} />
        </Route>
      </Routes>

      {/* Preferences Modal */}
      {showPreferencesModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div
            className="bg-white p-6 rounded-lg w-96"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-4">Set Your Preferences</h2>
            <form onSubmit={handlePreferenceSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Age</label>
                <input
                  type="number"
                  name="age"
                  value={preferences.age}
                  onChange={handlePreferenceChange}
                  className="border p-2 w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Gender</label>
                <input
                  type="text"
                  name="gender"
                  value={preferences.gender}
                  onChange={handlePreferenceChange}
                  className="border p-2 w-full"
                  required
                />
              </div>
              {/* Breed Dropdown */}
              <div className="mb-4">
                <label className="block text-gray-700">Breed</label>
                <select
                  name="breed"
                  value={preferences.breed}
                  onChange={handlePreferenceChange}
                  className="border p-2 w-full"
                  required
                >
                  <option value="">Select a breed</option>
                  {breed?.map((item) => (
                    <option key={item._id} value={item.breed_name}>
                      {item.breed_name}
                    </option>
                  ))}
                </select>
              </div>
              {/* Category Dropdown */}
              <div className="mb-4">
                <label className="block text-gray-700">Category</label>
                <select
                  name="category"
                  value={preferences.category}
                  onChange={handlePreferenceChange}
                  className="border p-2 w-full"
                  required
                >
                  <option value="">Select a category</option>
                  {category?.map((item) => (
                    <option key={item._id} value={item.category_name}>
                      {item.category_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">
                  Vaccination Status
                </label>
                <input
                  type="checkbox"
                  name="vaccination_status"
                  checked={preferences.vaccination_status}
                  onChange={handlePreferenceChange}
                  className="mr-2"
                />
                Yes, I have been vaccinated
              </div>
              <button
                type="submit"
                className="bg-gray-700 text-white py-2 px-4 rounded"
              >
                Save Preferences
              </button>
            </form>
          </div>
        </div>
      )}
    </BrowserRouter>
  )
}

export default MyRoutes
