import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav
      className="nav-bar flex justify-between px-5 pt-6 pb-3 w-full sticky"
      // style={{
      //   backgroundColor: "#CBB99F",
      // }}
    >
      <div className="w-2/5 ">
        <Link to='/' className="text-xl font-bold flex justify-center">Pawfect Match</Link>
      </div>
      <ul className="w-3/5 flex justify-evenly">
        <Link to='/adopt'>Adopt a pet</Link>
        <Link>About Us</Link>
        <Link to='/contact'>Contact</Link>
        <Link>Shop</Link>
        <Link to='/login'>Login</Link>
      </ul>
    </nav>
  );
};
export default Header;
