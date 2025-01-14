import React, { useState } from "react";
import "../css/Shops.css";
import NavBar from "../component/Header";
import Category from "../component/shop/Category";
import ShopArea from "../component/shop/ShopArea";

const Shops = () => {
  const [selectedCategory,setSelectedCategory]=useState('all');
  return (
    <div>       
      <NavBar/>
      <div>
        <Category selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>
        <ShopArea selectedCategory={selectedCategory}/>
      </div>
    </div>
  );
};

export default Shops;
