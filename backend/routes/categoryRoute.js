const express = require("express");
const {
  addCategory,
  getAllCategory,
  deleteCategory,
} = require("../controller/categoryController");
// const { categoryCheck, validation } = require("../validation");
const router = express.Router();

router.post("/addcategory",  addCategory);
router.get("/getallcategory", getAllCategory);
router.delete("/category/:id", deleteCategory);

module.exports = router;
