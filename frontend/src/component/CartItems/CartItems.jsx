import React, { useContext, useState } from "react";
import "./CartItems.css";
import { ShopContext } from "../Context/ShopContext";
import remove_icon from "../Hero/items/cart_cross_icon.png";
const CartItems = () => {
  const { all_product, cartItems, removeFromCart } = useContext(ShopContext);
  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Titile</p>
        <p>Price</p>
        <p>Quanitiy</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_product.map((e) => {
        if (cartItems[e.id] > 0) {
          <div>
            <div className="cartitems-format">
              <img src={e.image} alt="" className="carticon-product-icon" />
              <p>{e.name}</p>
              <p>Rs.{e.new_price}</p>
              <button className="cartitems-quantity">{cartItems[e.id]}</button>
              <p>{e.new_price * cartItems[e.id]}</p>
              <img
                src={remove_icon}
                onClick={() => removeFromCart(e.id)}
                alt=""
              />
            </div>
            <hr />
          </div>;
        }
      })}
    </div>
  );
};

export default CartItems;
