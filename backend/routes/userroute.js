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
  verifyEmail,
  resendVerification,
  forgetPassword,
  resetPassword,
  getDashboardStats,
  getAllUsers
} = require('../controller/usercontrol')
const validateUser = require('../middleware/authToken')
const { userCheck, validation } = require('../validation')
const { handleAdoptionResponse } = require('../controller/meetformController')
// const { userCheck, validation } = require('../validation')

const router = express.Router()

router.get('/allusers',getAllUsers)
router.post('/login', loginUserCtrl)
router.get('/verify/:token', verifyEmail)
router.post('/resendverification', resendVerification)
router.post('/forgetpassword', forgetPassword)
// router.get('/get-user-by-id', getAUser)
router.get('/resetpassword/:token', resetPassword) // For validating token
router.post('/resetpassword/:token', resetPassword) // For actually resetting password
router.get('/get-user-by-id', validateUser, getAUser)
router.get('/getuserstats', getUserStats)
router.get('/getallindividuals', getAllIndividuals)
router.delete('/deleteindividual/:userId', deleteIndividual)
router.get('/getallorganizations', getAllOrganizations)
router.delete('/deleteorganization/:orgId', deleteOrganization)
router.post('/updatepreferences', updatePreferences)
// router.patch('/update-name', updateFullName)
router.post('/register', userCheck, validation, register)
router.post('/send-adoption-email', sendAdoptionDetails)
router.post('/handle-adoption-response', handleAdoptionResponse)
// router.patch('/:id', updateAdoptionStatus);
router.post('/register', register)
// router.post('/register', userCheck, validation, register)
router.post('/send-adoption-email', sendAdoptionDetails)
router.get('/stats', validateUser, getDashboardStats)

module.exports = router
