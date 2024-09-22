import React from "react";

const Header = () => {
  return (
    <nav
      className="nav-bar flex justify-between px-5 pt-6 pb-3 w-full sticky"
      style={{
        backgroundColor: "#CBB99F",
      }}
    >
      <div className="w-2/5 ">
        <h1 className="text-xl font-bold flex justify-center">Pawfect Match</h1>
      </div>
      <ul className="w-3/5 flex justify-evenly">
        <li>Adopt a pet</li>
        <li>About Us</li>
        <li>Contact</li>
        <li>Shop</li>
        <li>Login</li>
      </ul>
    </nav>
  );
};
export default Header;
