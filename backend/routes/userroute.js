const express = require('express')
const {
  register,
  getAUser,
  getUserStats,
  getAllIndividuals,
  deleteIndividual,
  getAllOrganizations,
  deleteOrganization,
  verifyEmail,
  resendVerification,
  forgetPassword,
  resetPassword,
  login,
} = require('../controller/usercontrol')
const validateUser = require('../middleware/authToken')

const router = express.Router()

router.post('/register', register)
router.get('/verify-email/:token', verifyEmail)
router.post('/resend-verification', resendVerification)
router.post('/forgot-password', forgetPassword)
router.post('/reset-password/:token', resetPassword)
router.post('/login', login)
router.get('/get-user-by-id', validateUser, getAUser)
router.get('/getuserstats', getUserStats)
router.get('/getallindividuals', getAllIndividuals)
router.delete('/deleteindividual/:userId', deleteIndividual)
router.get('/getallorganizations', getAllOrganizations)
router.delete('/deleteorganization/:orgId', deleteOrganization)
module.exports = router
