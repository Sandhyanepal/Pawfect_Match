import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, clearCart } from '../store/slice/cartSlice';
import Header from '../component/Header';
import axios from 'axios';
import { toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js'

const Cart = () => {
  const dispatch = useDispatch();
  const { items, totalQuantity, totalPrice } = useSelector((state) => state.cart);
  const cart = useSelector(state => state.cart)
  const userDetail = useSelector(state => state.loginStatus.userDetail)
  const orderDetails = useSelector(state => state.cart.items)

  const handleRemoveFromCart = async (productId) => {
    const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/remove-from-cart/${userDetail?._id}/${productId}`)
    if (response.status === 200) {
      dispatch(removeFromCart(productId));
      toast.success('Product Removed Successfully');
    } else {
      toast.error('Something Went Wrong!!!');
    }
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };
  const handleCheckout = async () => {
    const stripe = await loadStripe("pk_test_51PAudlLrf2JUmkSsUoPwjAzgiyn2aK6AW3CzjsnVk1gg3lLiDV9JF9Ns2XoUoaAroKf87RXe1ys3ULEqD66czrqt00aXEa7nGd")
    const body = {
      products: orderDetails,
    }
    const headers = {
      'Content-Type': "application/json"
    }
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/initiate-payment`, body, headers)

    if (response.status === 200) {
      stripe.redirectToCheckout({
        sessionId: response?.data?.id
      })
      // try {
      //   // const response = await axios.post('http://localhost:5000/api/orders/create-order', orderDetails, {
      //   //   headers: {
      //   //     Authorization: `Bearer ${localStorage.getItem('auth-token')}`
      //   //   }
      //   // });

      //   if (response.data.success) {
      //     toast.success('Order placed successfully!');

      //     // Clear the cart after successful order placement

      //     clearCart([]);
      //     setCartItems([]);  // Clear cart items in frontend as well
      //   } else {
      //     alert('Failed to place the order.');
      //   }
      // } catch (error) {
      //   console.error('Error placing order:', error);
      //   alert('Something went wrong.');
      // }
    }
  }
  return (
    <div>
      <Header />
      <div className="container mx-auto mt-8 p-6">
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
        {items.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div>
            <div className="space-y-4">
              {cart.items.map((item) => (
                <div key={item.productId} className="flex justify-between items-center">
                  <img
                    className='w-[150px]'
                    src={`${import.meta.env.VITE_BACKEND_URL}/${item?.image?.slice(
                      6
                    )}`} />
                  <div className="flex-1 mx-4">
                    <p className="text-lg">{item.name}</p>
                    <p className="text-sm text-gray-600">Price: ${item.price}</p>
                  </div>
                  <div className="flex items-center">
                    <p className="text-lg">{item.quantity}</p>
                    <button
                      onClick={() => handleRemoveFromCart(item.productId)}
                      className="ml-4 px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-right">
              <p className="text-lg font-semibold">Total Quantity: {totalQuantity}</p>
              <p className="text-xl font-bold mt-2">Total Price: ${totalPrice}</p>
              {/* <button
                onClick={handleClearCart}
                className="mt-4 px-6 py-2 bg-gray-600 text-white rounded-full hover:bg-gray-700"
              >
                Clear Cart
              </button> */}
            </div>
            <button onClick={handleCheckout}>Checkout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
