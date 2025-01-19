import React, { useContext } from "react";
import NavBar from "../component/NavBar";
import "../css/ShopCategory.css";
import { ShopContext } from "../component/Context/ShopContext";
import dropdown_icon from "../component/Hero/items/dropdown_icon.png";
import Item from "../component/Item/Item";

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  return (
    <div>
      <NavBar />
      <div className="shop-catgory">
        <p>kid banner</p>
        <div className="shopcategory-indexSort">
          <p>
            <span>Showing 1-12</span>
          </p>
          <div className="shopcategory-sort">
            Sort by <img src={dropdown_icon} alt="" />
          </div>
        </div>
        <div className="shopcategory-products">
          {all_product.map((item, i) => {
            if (props.category === item.category) {
              return (
                <Item
                  key={i}
                  id={item.id}
                  name={item.name}
                  image={item.image}
                  new_price={item.new_price}
                  old_price={item.old_price}
                />
              );
            } else {
              return null;
            }
          })}
        </div>
        <div className="shopcategory-loadmore">Explore More</div>
      </div>
    </div>
  );
};

export default ShopCategory;
