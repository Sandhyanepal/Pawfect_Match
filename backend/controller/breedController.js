const Breed = require("../model/breedmodel");
const Category = require("../model/categorymodel");
const mongoose = require("mongoose");

// Add a new breed
exports.addBreed = async (req, res) => {
  try {
    const { breed_name, category_id } = req.body;

    // Validate input
    if (!breed_name || !category_id) {
      return res.status(400).json({ error: "Breed name and category ID are required" });
    }

    // Check if the category exists
    const category = await Category.findById(category_id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    // Check if the breed already exists for the given category
    const existingBreed = await Breed.findOne({ breed_name, category: category_id });
    if (existingBreed) {
      return res.status(400).json({ error: "Breed already exists for this category" });
    }

    // Create the breed
    const breed = await Breed.create({
      breed_name,
      category: category_id,
    });

    if (!breed) {
      return res.status(400).json({ error: "Failed to create breed" });
    }

    res.status(201).json({
      success: true,
      message: "Breed created successfully",
      data: breed,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error. Failed to create breed" });
  }
};

// Get all breeds
exports.getAllbreed = async (req, res) => {
  try {
    const breeds = await Breed.find().populate("category", "category_name"); // Populate category details
    res.status(200).json({
      success: true,
      message: "Breeds fetched successfully",
      data: breeds,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error. Failed to fetch breeds" });
  }
};

// Delete a breed
exports.deleteBreed = async (req, res) => {
  try {
    const breed = await Breed.findByIdAndDelete(req.params.id);
    if (!breed) {
      return res.status(404).json({ error: "Breed not found" });
    }
    res.status(200).json({
      success: true,
      message: "Breed deleted successfully",
      data: breed,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error. Failed to delete breed" });
  }
};

// Fetch breeds by category ID
exports.getBreedsByCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;

    // Validate category ID
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(400).json({ error: "Invalid category ID" });
    }

    // Fetch breeds that belong to the specified category
    const breeds = await Breed.find({ category: categoryId }).populate(
      "category",
      "category_name"
    );

    if (!breeds || breeds.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No breeds found for the specified category",
      });
    }

    res.status(200).json({
      success: true,
      message: "Breeds fetched successfully",
      data: breeds,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error. Failed to fetch breeds",
      error: error.message,
    });
  }
};
// Fetch a single breed by ID
exports.getSingleBreed = async (req, res) => {
  try {
    const breedId = req.params.id;

    // Validate breed ID
    if (!mongoose.Types.ObjectId.isValid(breedId)) {
      return res.status(400).json({ error: "Invalid breed ID" });
    }

    // Fetch the breed by ID and populate the category field
    const breed = await Breed.findById(breedId).populate(
      "category",
      "category_name",
    );

    if (!breed) {
      return res.status(404).json({ error: "Breed not found" });
    }

    res.status(200).json({
      success: true,
      message: "Breed fetched successfully",
      data: breed,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error. Failed to fetch breed",
      error: error.message,
    });
  }
};