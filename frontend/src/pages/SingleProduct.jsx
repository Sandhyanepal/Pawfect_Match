import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../component/Header';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/slice/cartSlice';
import { toast } from 'react-toastify';

const SingleProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const dispatch = useDispatch();
    const userId = useSelector(state => state.loginStatus.userDetail._id)
    useEffect(() => {
        const fetchProduct = async () => {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/product/${id}`);
            setProduct(response.data.data);
        };
        fetchProduct();
    }, [id]);

    if (!product) {
        return <div className="text-center text-gray-500">Loading...</div>;
    }
    const handleAddToCart = async () => {
        if (product) {
            // Dispatch the action to add the product to Redux state
            try {
                const cartData = {
                    userId: userId,
                    productId: product._id,
                    quantity: 1,
                };
                const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/add-to-cart`, cartData);
                if (response.status === 200) {
                    dispatch(
                        addToCart({
                            productId: product._id,
                            name: product.name,
                            price: product.price,
                            quantity: 1,
                            image: product.image,
                        })
                    );
                    toast.success('Product Added To Cart');
                }
            } catch (error) {
                console.log(error.response)
            }
        }
    };
    return (
        <div>
            <Header />
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row items-center bg-white p-6 rounded-lg ">
                    <img
                        src={`${import.meta.env.VITE_BACKEND_URL}/${product?.image?.slice(
                            6
                        )}`} />
                    <div className="md:ml-8 flex-1">
                        <h1 className="text-3xl font-semibold mb-4">{product.name}</h1>
                        <p className="text-lg text-gray-600 mb-4">{product.category_name}</p>
                        <p className="text-sm text-gray-500 mb-4">{product.description}</p>
                        <div className="flex items-center justify-between">
                            <span className="text-xl font-bold text-green-600">${product.price}</span>
                            <span className="text-sm text-gray-400">Stock: {product.stock}</span>
                        </div>
                        <div className="mt-4">
                            <button
                                onClick={handleAddToCart}
                                className="px-6 py-2 bg-slate-600 text-white rounded-full hover:bg-slate-700"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div>
            </div>
        </div>
    );
};

export default SingleProduct;
