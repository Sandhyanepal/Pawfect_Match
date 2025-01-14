import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Items in the cart
    totalQuantity: 0, // Total number of items in the cart
    totalPrice: 0, // Total price of items in the cart
  },
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.productId === newItem.productId);

      if (existingItem) {
        existingItem.quantity += newItem.quantity;
        existingItem.totalPrice += newItem.price * newItem.quantity;
      } else {
        state.items.push({
          ...newItem,
          totalPrice: newItem.price * newItem.quantity,
        });
      }

      state.totalQuantity += newItem.quantity;
      state.totalPrice += newItem.price * newItem.quantity;
    },
    removeFromCart(state, action) {
      const productId = action.payload;

      const existingItem = state.items.find((item) => item.productId === productId);

      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalPrice -= existingItem.totalPrice;

        state.items = state.items.filter((item) => item.productId !== productId);
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
    setCart(state, action) {
      const cartData = action.payload;

      state.items = cartData.map((item) => ({
        productId: item.productId._id, // Flatten nested product data
        name: item.productId.name,
        price: item.productId.price,
        image: item.productId.image,
        quantity: item.quantity,
        totalPrice: item.quantity * item.productId.price,
      }));

      state.totalQuantity = cartData.reduce((total, item) => total + item.quantity, 0);
      state.totalPrice = cartData.reduce((total, item) => total + item.quantity * item.productId.price, 0);
    },
  },
});

export const { addToCart, removeFromCart, clearCart, setCart } = cartSlice.actions;
export default cartSlice.reducer;
