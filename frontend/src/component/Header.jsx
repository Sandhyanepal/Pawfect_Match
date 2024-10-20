import React from "react";
import { Link } from "react-router-dom";

const Header = ({ title,color }) => {
  let backgroundStyle;
  // let text;
  if(title ==="Adopt")
  {
    backgroundStyle ="#374151"
  }
  else if(title ==="Login")
  {
    backgroundStyle ="#374151"
  }
  else 
  {
    backgroundStyle="linear-gradient(89deg, rgba(255,255,255,1) 0%, rgba(199,189,182,1) 100%)";
  }
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`nav-bar flex justify-between items-center px-5 pt-5 pb-5 w-full sticky ${color} `}
      style={{ background: backgroundStyle}}
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
