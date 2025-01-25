const express = require("express");
const {
  addBreed,
  getAllbreed,
  deleteBreed,
  getBreedsByCategory,
  getSingleBreed // Import the new controller function
} = require("../controller/breedController");

const router = express.Router();

// Existing routes
router.post("/addbreed", addBreed);
router.get("/getallbreed", getAllbreed);
router.delete("/breed/:id", deleteBreed);
router.get("/breed/:id",getSingleBreed);

// New route to fetch breeds by category
router.get("/breeds-by-category/:categoryId", getBreedsByCategory);

module.exports = router;