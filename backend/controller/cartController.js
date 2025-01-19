const Cart = require('../model/cartmodel');
const Product = require('../model/productmodel');

// Add item to the cart
exports.addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Find the product to check if it's valid
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if the user already has a cart
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      // If no cart, create a new one
      cart = new Cart({ userId, items: [] });
    }

    // Check if the item already exists in the cart
    const existingItem = cart.items.find(item => item.productId.toString() === productId);
    if (existingItem) {
      // If the item exists, update the quantity
      existingItem.quantity += quantity;
    } else {
      // If the item doesn't exist, add a new item
      cart.items.push({ productId, quantity });
    }

    // Save the cart
    await cart.save();
    return res.status(200).json({ message: 'Item added to cart', cart });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

// Remove item from the cart
exports.removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    // Find the user's cart
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Remove the item from the cart
    cart.items = cart.items.filter(item => item.productId.toString() !== productId);
    await cart.save();

    return res.status(200).json({ message: 'Item removed from cart', cart });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

// Update item quantity in the cart
exports.updateQuantity = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (quantity < 1) {
      return res.status(400).json({ message: 'Quantity must be greater than 0' });
    }

    // Find the user's cart
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Find the cart item and update the quantity
    const item = cart.items.find(item => item.productId.toString() === productId);
    if (item) {
      item.quantity = quantity;
    } else {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    // Save the cart
    await cart.save();
    return res.status(200).json({ message: 'Cart updated', cart });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

// Get all items in the cart
exports.getCart = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find the user's cart
    const cart = await Cart.findOne({ userId }).populate('items.productId');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    return res.status(200).json({ message: 'Cart fetched successfully', cart });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

// Clear the cart
exports.clearCart = async (req, res) => {
  try {
    const { userId } = req.body;

    // Find the user's cart and remove all items
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = [];
    await cart.save();

    return res.status(200).json({ message: 'Cart cleared successfully', cart });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};
