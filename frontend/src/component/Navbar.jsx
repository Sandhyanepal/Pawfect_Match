import React, { useState } from "react";
import { FaShopify } from "react-icons/fa6";
import { CiShoppingCart } from "react-icons/ci";
import "../css/Navbar.css";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [menu, setMenu] = useState("shop");
  return (
    <div>
      <div className="navbar">
        <div className="nav-logo">
          <FaShopify className="size-9" /> <p>PawFetch Store</p>
        </div>

        <ul className="nav-menu">
          <li
            onClick={() => {
              setMenu("shop");
            }}
          >
            <Link to="/">Adopt a pet</Link> {menu === "adopt" ? <hr /> : <></>}
          </li>
          <li
            onClick={() => {
              setMenu("shop");
            }}
          >
            <Link to="/shops">Shop</Link> {menu === "shop" ? <hr /> : <></>}
          </li>
          <li
            onClick={() => {
              setMenu("mens");
            }}
          >
            <Link to="/mens">Mens</Link>
            {menu === "mens" ? <hr /> : <></>}
          </li>
          <li
            onClick={() => {
              setMenu("womens");
            }}
          >
            <Link to="/womens">Womens</Link>
            {menu === "womens" ? <hr /> : <></>}
          </li>
        </ul>
        <div className="nav-login-cart">
          <Link t o="/login">
            <button>Login</button>
          </Link>
          <Link to="/cart">
            <CiShoppingCart className="size-9" />
          </Link>
          <div className="nav-cart-count">0</div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
