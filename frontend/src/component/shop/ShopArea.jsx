import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const ShopArea = ({ selectedCategory, type = 'all', keyword }) => {
  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/get-all-products`);
        const allProducts = response.data.data;

        setProducts(allProducts);
        setFilterProducts(allProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchAllProducts();
  }, []);

  useEffect(() => {
    if (type === 'all' && !selectedCategory && !keyword) {
      setFilterProducts(products)
      return;
    }
    let filtered = products;

    if (type && type !== 'all') {
      filtered = filtered.filter(product => product?.type?.toLowerCase() === type.toLowerCase());
    }

    if (selectedCategory && selectedCategory !== 'all') {
      console.log(selectedCategory)
      filtered = filtered.filter(product =>
        product?.category?.category_name?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (keyword) {
      console.log('keyword', keyword)
      filtered = filtered.filter(product =>
        product?.name?.toLowerCase().includes(keyword.toLowerCase())
      );
    }

    console.log("Filtered products:", filtered);
    setFilterProducts(filtered);
  }, [selectedCategory, type, keyword]);

  return (
    <div className="container mx-auto px-4 py-8">
      {filterProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filterProducts.map((product) => (
            <NavLink
              to={`/product/${product?._id}`}
              key={product._id}
              className="bg-white p-4 rounded-lg shadow-lg"
            >
              <img
                className="h-[200px] w-full object-cover"
                src={`${import.meta.env.VITE_BACKEND_URL}/${product?.image?.slice(6)}`}
                alt={product.name}
              />
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-500">{product?.category?.category_name}</p>
              <p className="text-gray-700 mt-2">{product.description}</p>
              <div className="mt-4">
                <p className="text-lg font-bold text-slate-500">Price: ${product.price}</p>
              </div>
            </NavLink>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 text-lg">
          No products found.
        </div>
      )}
    </div>
  );
};

export default ShopArea;
