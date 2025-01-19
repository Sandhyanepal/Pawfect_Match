const express = require("express");
const {
  register,
  loginUserCtrl,
  getAUser,
  getUserStats,
  getAllIndividuals,
  deleteIndividual,
  getAllOrganizations,
  deleteOrganization,
  updatePreferences,
  sendAdoptionDetails,
} = require("../controller/usercontrol");
const validateUser = require("../middleware/authToken");
const { suggestPets } = require("../controller/petcontrol");
const { userCheck, validation } = require("../validation");


const router = express.Router();

router.post("/register", userCheck, validation, register);
router.post("/login", loginUserCtrl);
router.get("/get-user-by-id", validateUser, getAUser);
router.get("/getuserstats", getUserStats);
router.get("/getallindividuals", getAllIndividuals);
router.delete("/deleteindividual/:userId", deleteIndividual);
router.get("/getallorganizations", getAllOrganizations);
router.delete("/deleteorganization/:orgId", deleteOrganization);
router.post("/send-adoption-email", sendAdoptionDetails);
router.get("/suggestedpets", suggestPets);
router.post("/updatepreferences", updatePreferences);
module.exports = router;
