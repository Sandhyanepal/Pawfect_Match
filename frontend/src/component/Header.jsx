import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setLoggedIn, setUserDetail } from '../store/slice/loginStatusSlice'
import { toast } from 'react-toastify'
import YTTransition from '../assets/transition/uptodown/YTTransition'

const Header = () => {
  const { isLoggedIn, userDetail } = useSelector((state) => state.loginStatus)
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [showDropdown, setShowDropdown] = useState(false)

  const handelLogOut = () => {
    localStorage.removeItem('authToken')
    dispatch(setUserDetail({}))
    dispatch(setLoggedIn(false))
    navigate('/')
    toast.success('Logged Out Successfully')
  }

  const toggleDropdown = () => setShowDropdown((prev) => !prev)

  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      {/* Top Section */}
      <div className="flex justify-between items-center px-6  py-4 pl-6">
        {/* Social Media Links */}
        <div className="flex space-x-4 text-gray-600 text-xl">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black"
          >
            <i className="fab fa-facebook"></i>
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="https://www.pinterest.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black"
          >
            <i className="fab fa-pinterest"></i>
          </a>
        </div>

        {/* Logo */}
        <Link to="/" className="text-3xl font-bold ">
          Pawfect Match
        </Link>

        {/* Call to Action Button */}
        {isLoggedIn ? (
          <div className="relative hidden md:block">
            <div
              className=" grid place-items-center bg-black text-white cursor-pointer py-1 px-4 rounded-3xl"
              onClick={toggleDropdown}
            >
              {userDetail?.email?.split('@')[0]}
            </div>
            {showDropdown && (
              <div className="absolute top-12 right-0 bg-white shadow-lg rounded-md w-48">
                <ul className="py-2">
                  <li className="px-4 py-2 text-black hover:bg-slate-100 cursor-pointer">
                    <Link to="/profile">Profile</Link>
                  </li>
                  <div
                    delay="1.2"
                    className="px-4 py-2 text-black hover:bg-slate-100 cursor-pointer"
                    onClick={handelLogOut}
                  >
                    Logout
                  </div>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <YTTransition delay="1.2">
            <Link
              to="/login"
              className="hidden md:block px-6 py-2 bg-black text-white text-sm rounded-full hover:bg-gray-800"
            >
              Login
            </Link>
          </YTTransition>
        )}

        {/* Hamburger Menu (for mobile) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-2xl text-gray-800 md:hidden"
        >
          <i className={`fa-solid ${menuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
        </button>
      </div>

      {/* Navigation Links (Desktop) */}
      <nav className="hidden md:flex justify-center space-x-8 text-gray-700 pb-4">
        <Link to="/" className="hover:text-black">
          Home
        </Link>
        <Link to="/contact" className="hover:text-black">
          About
        </Link>
        <Link to="/adopt" className="hover:text-black">
          Adopt a pet
        </Link>
        <Link to="/shop" className="hover:text-black">
          Shop
        </Link>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="flex flex-col items-center bg-gray-100 md:hidden py-4">
          <Link
            to="/"
            className="py-2 text-gray-700 hover:text-gray-900"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="py-2 text-gray-700 hover:text-gray-900"
            onClick={() => setMenuOpen(false)}
          >
            About
          </Link>
          <Link
            to="/blog"
            className="py-2 text-gray-700 hover:text-gray-900"
            onClick={() => setMenuOpen(false)}
          >
            Blog
          </Link>
          <Link
            to="/contact"
            className="py-2 text-gray-700 hover:text-gray-900"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </Link>
          <Link
            to="/shop"
            className="py-2 text-gray-700 hover:text-gray-900"
            onClick={() => setMenuOpen(false)}
          >
            Shop
          </Link>
          {isLoggedIn ? (
            <div
              className="py-2 text-gray-700 hover:text-gray-900"
              onClick={handelLogOut}
            >
              Logout
            </div>
          ) : (
            <Link
              to="/login"
              className="py-2 text-gray-700 hover:text-gray-900"
            >
              Login
            </Link>
          )}
        </nav>
      )}
    </header>
  )
}

export default Header
