const express = require("express");
const { getAllPets } = require("../controller/petcontrol");
// const validateUser = require("../middleware/authToken");

const router = express.Router();

router.get("/getallpets", getAllPets);

module.exports = router;
