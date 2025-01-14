const express = require("express");
const {
  addBreed,
  getAllbreed,
  deleteBreed,
} = require("../controller/breedController");
const router = express.Router();

router.post("/addbreed", addBreed);
router.get("/getallbreed", getAllbreed);
router.delete("/breed/:id", deleteBreed);

module.exports = router;
