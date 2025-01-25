const express = require('express')
const upload = require('../middleware/fileUpload')
const {
  getAllPets,
  addPet,
  getSinglePet,
  deletePet,
  editPet,
  suggestPets,
  updatePetStatus
} = require('../controller/petcontrol')
// const validateUser = require("../middleware/authToken");

const router = express.Router()

router.post('/addpet', upload.single('image'), addPet)
router.get('/getallpets', getAllPets)
router.get('/pets/:id', getSinglePet)
router.delete('/pet/:id', deletePet)
router.put('/pet/:id', upload.single('image'), editPet)
router.get('/suggestedpets/:id', suggestPets)
router.put('/pets/:id',updatePetStatus)

module.exports = router
