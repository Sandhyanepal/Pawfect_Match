import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setLoggedIn, setUserDetail } from "../store/slice/loginStatusSlice";
import { toast } from "react-toastify";
import YTTransition from "../assets/transition/uptodown/YTTransition";

const Header = ({ title, color }) => {
  const { isLoggedIn, userDetail } = useSelector((state) => state.loginStatus);
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handelLogOut = () => {
    localStorage.removeItem("authToken");
    dispatch(setUserDetail({}));
    dispatch(setLoggedIn(false));
    navigate("/");
    toast.success("Logged Out Successfully");
  };

  let backgroundStyle;
  if (title === "Adopt" || title === "Login") {
    backgroundStyle = "#374151";
  } else {
    backgroundStyle =
      "linear-gradient(89deg, rgba(255,255,255,1) 0%, rgba(199,189,182,1) 100%)";
  }

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleDropdown = () => setShowDropdown((prev) => !prev);
  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);

  return (
    <nav
      className={`nav-bar flex justify-between items-center px-5 pt-5 pb-5 w-full sticky ${color}`}
      style={{ background: backgroundStyle }}
    >
      <div className="w-2/5">
        <Link
          to="/"
          className="text-xl font-bold flex justify-center items-center gap-2"
        >
          <i className="fa-solid fa-paw font-bold text-3xl -rotate-45"></i>
          Pawfect Match
        </Link>
      </div>

      <div className="hidden md:flex w-3/5 justify-evenly items-center">
        <YTTransition>
          <Link to="/adopt">Adopt a pet</Link>
        </YTTransition>
        <YTTransition delay="0.4" onClick={() => scrollToSection("about")} className="cursor-pointer">
          About Us
        </YTTransition>
        <YTTransition
          delay="0.8"
          onClick={() => scrollToSection("contact")}
          className="cursor-pointer"
        >
          Contact
        </YTTransition>
        {isLoggedIn ? (
          <div className="relative">
            <div
              className="h-10 w-10 grid place-items-center bg-white rounded-full text-slate-700 font-bold cursor-pointer"
              onClick={toggleDropdown}
            >
              {userDetail?.email?.split("")[0]?.toUpperCase()}
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
            <Link to="/login">Login</Link>
          </YTTransition>
        )}
      </div>

      <div className="md:hidden flex items-center">
        <button
          onClick={toggleMobileMenu}
          className="text-2xl text-white focus:outline-none"
        >
          <i className="fa-solid fa-bars"></i>
        </button>
      </div>

      <div
        className={`md:hidden fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 transition-all transform ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={toggleMobileMenu}
      >
        <div className="flex justify-end p-5">
          <button onClick={toggleMobileMenu} className="text-2xl text-white">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="flex flex-col items-center justify-center text-center">
          <YTTransition>
            <Link to="/adopt" className="py-3 text-white text-lg">
              Adopt a pet
            </Link>
          </YTTransition>
          <YTTransition delay="0.4" className="py-3 text-white text-lg" onClick={() => scrollToSection("about")}>
            About Us
          </YTTransition>
          <YTTransition delay="0.8" className="py-3 text-white text-lg" onClick={() => scrollToSection("contact")}>
            Contact
          </YTTransition>
          {isLoggedIn ? (
            <div className="py-3 text-white text-lg cursor-pointer" onClick={handelLogOut}>
              Logout
            </div>
          ) : (
            <Link to="/login" className="py-3 text-white text-lg">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
