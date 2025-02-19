import React from "react";
import footer_logo from "../Hero/items/logo_big.png";
import instagram_icon from "../Hero/items/instagram_icon.png";
import pintester_icon from "../Hero/items/pintester_icon.png";
import whatsapp_icon from "../Hero/items/whatsapp_icon.png";
import "./Footer.css";
const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-logo">
        <img src={footer_logo} alt="" />
        <p>PAWFETCH</p>
      </div>
      <ul className="footer-links">
        <li>Company</li>
        <li>Products</li>
        <li>Offices</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
      <div className="footer-social-icon">
        <div className="footer-icons-container">
          <img src={instagram_icon} alt="" />
        </div>
        <div className="footer-icons-container">
          <img src={pintester_icon} alt="" />
        </div>
        <div className="footer-icons-container">
          <img src={whatsapp_icon} alt="" />
        </div>
      </div>
      <div className="footer-copyright">
        <hr />
        <p>Copyright @2023 - All Right Reserved</p>
      </div>
    </div>
  );
};

export default Footer;
