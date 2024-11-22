import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setLoggedIn, setUserDetail } from "../store/slice/loginStatusSlice";
import { toast } from "react-toastify";

const Header = ({ title, color }) => {
  const { isLoggedIn, userDetail } = useSelector((state) => state.loginStatus);
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handelLogOut = () => {
    dispatch(setUserDetail(null));
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
      <ul className="w-3/5 flex justify-evenly items-center">
        <Link to="/adopt">Adopt a pet</Link>
        <li onClick={() => scrollToSection("about")} className="cursor-pointer">
          About Us
        </li>
        <li
          onClick={() => scrollToSection("contact")}
          className="cursor-pointer"
        >
          Contact
        </li>
        <Link to="/shop">Shop</Link>
        {isLoggedIn ? (
          <div className="relative">
            <div
              className="h-10 w-10 grid place-items-center bg-white rounded-full text-slate-700 font-bold cursor-pointer"
              onClick={toggleDropdown}
            >
              {userDetail?.fullName.split("")[0].toUpperCase()}
            </div>
            {showDropdown && (
              <div className="absolute top-12 right-0 bg-white shadow-lg rounded-md w-48">
                <ul className="py-2">
                  <li className="px-4 py-2 hover:bg-slate-100">
                    <Link to="/profile">Profile</Link>
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-slate-100 cursor-pointer"
                    onClick={handelLogOut}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </ul>
    </nav>
  );
};

export default Header;
