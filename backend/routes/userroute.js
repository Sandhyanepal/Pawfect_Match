const express = require('express')
const {
  register,
  getAUser,
  getUserStats,
  getAllIndividuals,
  deleteIndividual,
  getAllOrganizations,
  deleteOrganization,
  updatePreferences,
  // updateFullName,
  loginUserCtrl,
  sendAdoptionDetails,
} = require('../controller/usercontrol')
<<<<<<< HEAD
const validateUser = require('../middleware/authToken')
const { suggestPets } = require('../controller/petcontrol')
const { userCheck, validation } = require("../validation");
const { handleAdoptionResponse, updateAdoptionStatus } = require('../controller/meetformController');
=======
// const validateUser = require('../middleware/authToken')
// const { userCheck, validation } = require('../validation')

>>>>>>> 744a7c566480fae261ac83192ee8540f33a921e4
const router = express.Router()

router.post('/login', loginUserCtrl)
router.get('/get-user-by-id', getAUser)
// router.get('/get-user-by-id', validateUser, getAUser)
router.get('/getuserstats', getUserStats)
router.get('/getallindividuals', getAllIndividuals)
router.delete('/deleteindividual/:userId', deleteIndividual)
router.get('/getallorganizations', getAllOrganizations)
router.delete('/deleteorganization/:orgId', deleteOrganization)
router.post('/updatepreferences', updatePreferences)
// router.patch('/update-name', updateFullName)
<<<<<<< HEAD
router.post("/register", userCheck, validation, register);
router.post("/send-adoption-email", sendAdoptionDetails);
router.post('/handle-adoption-response', handleAdoptionResponse);
// router.patch('/:id', updateAdoptionStatus);
=======
router.post('/register', register)
// router.post('/register', userCheck, validation, register)
router.post('/send-adoption-email', sendAdoptionDetails)
>>>>>>> 744a7c566480fae261ac83192ee8540f33a921e4

module.exports = router
