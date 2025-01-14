import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const ShopArea = ({ selectedCategory }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/get-all-products`);
      console.log(response);
      setProducts(response.data.data);
    };
    fetchAllProducts();
  }, [selectedCategory]);

  return (
    <div className="container mx-auto px-4 py-8">

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <NavLink to={`/product/${product?._id}`} key={product._id} className="bg-white p-4 rounded-lg shadow-lg">
            <img
              className='h-[200px] w-full object-cover'
              src={`${import.meta.env.VITE_BACKEND_URL}/${product?.image?.slice(
                6
              )}`} />
            <h3 className="text-xl font-semibold">{product.name}</h3>
            <p className="text-sm text-gray-500">{product.category_name}</p>
            <p className="text-gray-700 mt-2">{product.description}</p>
            <div className="mt-4">
              <p className="text-lg font-bold text-slate-500">Price: ${product.price}</p>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default ShopArea;
