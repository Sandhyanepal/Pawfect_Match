const express = require("express")
const {
  register,
  loginUserCtrl,
  getAUser,
  getUserStats,
  getAllIndividuals,
  deleteIndividual,
  getAllOrganizations,
  deleteOrganization,
} = require("../controller/usercontrol")
const validateUser = require("../middleware/authToken")

const router = express.Router()

router.post("/register", register)
router.post("/login", loginUserCtrl)
router.get("/get-user-by-id", validateUser, getAUser)
router.get('/getuserstats', getUserStats)
router.get('/getallindividuals', getAllIndividuals)
router.delete('/deleteindividual/:userId', deleteIndividual)
router.get('/getallorganizations', getAllOrganizations)
router.delete('/deleteorganization/:id', deleteOrganization)
module.exports = router
