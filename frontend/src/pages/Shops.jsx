import React, { useState } from "react";
import "../css/Shops.css";
import NavBar from "../component/Header";
import Category from "../component/shop/Category";
import ShopArea from "../component/shop/ShopArea";
import SearchSection from "../component/shop/SearchSection";

const Shops = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [type, setType] = useState("all");
  return (
    <div>
      <NavBar />
      <div>
        <SearchSection type={type} setType={setType} />
        <Category selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        <ShopArea selectedCategory={selectedCategory} type={type} />
      </div>
    </div>
  );
};

export default Shops;
