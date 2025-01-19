const express = require("express");
const {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} = require("../controller/productController");
const upload = require("../middleware/fileUpload");

const router = express.Router();

// Routes

// Add a new product
router.post("/add-product",upload.single('image'), addProduct);

// Get all products
router.get("/get-all-products", getAllProducts);  
  
// Get a product by ID
router.get("/product/:id", getProductById);

// Update a product
router.put("/product/:id", updateProduct);

module.exports = router;
