const Product = require("../model/productmodel");
const Category = require("../model/categorymodel");

// Add a new product
const addProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category } = req.body;
    // Validate if the category exists

    const existingCategory = await Category.findById(category);
    if (!existingCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const newProduct = new Product({
      name,
      description,
      price,
      stock,
      category,
      image: req.file?.path.replace(/\\/g, "/"),
    });

    const savedProduct = await newProduct.save();
    res.status(201).json({
      success: true,
      message: "Product added successfully",
      data: savedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding product",
      error: error.message,
    });
  }
};

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ isActive: true }) // Only fetch active products
      .populate("category", "category_name"); // Populate category details

    res.status(200).json({
      success: true,
      message: "Products retrieved successfully",
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving products",
      error: error.message,
    });
  }
};

// Get a product by ID
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id)
      .populate("category", "category_name");

    if (!product || !product.isActive) {
      return res.status(404).json({
        success: false,
        message: "Product not found or is deactivated",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product retrieved successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving product",
      error: error.message,
    });
  }
};

// Update a product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Validate category existence if updating category
    if (updates.category) {
      const existingCategory = await Category.findById(updates.category);
      if (!existingCategory) {
        return res.status(404).json({
          success: false,
          message: "Category not found",
        });
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updates, {
      new: true, // Return the updated product
      runValidators: true, // Run validation checks
    });

    if (!updatedProduct || !updatedProduct.isActive) {
      return res.status(404).json({
        success: false,
        message: "Product not found or is deactivated",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating product",
      error: error.message,
    });
  }
};


module.exports = {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
};
