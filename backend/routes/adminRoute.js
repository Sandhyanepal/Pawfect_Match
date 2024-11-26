const express = require("express");
const { fetchPets } = require("../controller/adminController");
// const validateUser = require("../middleware/authToken");

const router = express.Router();

router.post("/getAllPets", fetchPets);

module.exports = router;
