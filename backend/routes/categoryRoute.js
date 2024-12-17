const express = require("express");
const {
  addCategory,
  getAllCategory,
} = require("../controller/categoryController");
const router = express.Router();

router.post("/addcategory", addCategory);
router.get("/getallcategory", getAllCategory);

module.exports = router;
