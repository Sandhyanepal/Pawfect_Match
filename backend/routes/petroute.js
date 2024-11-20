const express = require("express");
const upload = require('../middleware/fileUpload')
const { getAllPets, addPet } = require("../controller/petcontrol");
// const validateUser = require("../middleware/authToken");

const router = express.Router();

router.post('/addpet', upload.single('image'), addPet)
router.get("/getallpets", getAllPets);

module.exports = router;
