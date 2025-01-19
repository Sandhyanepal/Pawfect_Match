import React from "react";
import "./Hero.css";
import hand_icon from "./items/hand_icon.png";
import arrow_icon from "./items/arrow.png";
import hero_image from "./items/hero_image.png";
const Hero = () => {
  console.log(hand_icon);
  return (
    <div className="hero">
      <div className="hero-left">
        <h2>New Arrival Only</h2>
        <div>
          <div className="hero-hand-icon">
            <p>new</p>
            <img src={hand_icon} alt="" />
          </div>
          <p>Collection</p>
          <p>For everyone</p>
        </div>
        <div className="hero-latest-btn">
          <div>Latest Collection</div>
          <img src={arrow_icon} alt="" />
        </div>
      </div>
      <div className="hero-right">
        <img src={hero_image} alt="" />
      </div>
    </div>
  );
};

export default Hero;
