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
  updateFullName,
  loginUserCtrl,
} = require('../controller/usercontrol')
const validateUser = require('../middleware/authToken')
const { suggestPets } = require('../controller/petcontrol')

const router = express.Router()

router.post('/register', register)
router.post('/login', loginUserCtrl)
router.get('/get-user-by-id', validateUser, getAUser)
router.get('/getuserstats', getUserStats)
router.get('/getallindividuals', getAllIndividuals)
router.delete('/deleteindividual/:userId', deleteIndividual)
router.get('/getallorganizations', getAllOrganizations)
router.delete('/deleteorganization/:orgId', deleteOrganization)
router.get('/suggestedpets', suggestPets)
router.post('/updatepreferences', updatePreferences)
router.patch('/update-name', updateFullName)

module.exports = router
