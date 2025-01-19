const express = require('express');
const { addToCart, removeFromCart, updateQuantity, getCart, clearCart } = require('../controller/cartController');

const router = express.Router();

// Routes for cart actions
router.post('/add-to-cart', addToCart);
router.delete('/remove-from-cart/:userId/:productId', removeFromCart);
router.put('/update-quantity', updateQuantity);
router.get('/get-cart/:userId', getCart);
router.delete('/clear-cart', clearCart);

module.exports = router;
