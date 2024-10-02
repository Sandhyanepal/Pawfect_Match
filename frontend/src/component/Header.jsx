import React from "react";
import { Link } from "react-router-dom";

const Header = ({ title }) => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className="nav-bar flex justify-between items-center px-5 pt-6 pb-3 w-full sticky"
      // style={{ backgroundColor }}
    >
      <div className="w-2/5 ">
        <Link to="/" className="text-xl font-bold flex justify-center items-center gap-2">
          <i className="fa-solid fa-paw font-bold text-3xl -rotate-45"></i>
          Pawfect Match
        </Link>
      </div>
      <ul className="w-3/5 flex justify-evenly">
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
        <Link to="/login">Login</Link>
      </ul>
    </nav>
  );
};
export default Header;
