const express = require("express");
const {
  addMeetform,
  getAllFormRequest,
  getAllFormForUser
} = require("../controller/meetformController");

const router = express.Router();

router.post("/submitform", addMeetform);
router.post("/getAllFormRequest", getAllFormRequest);
router.get('/getAllFormForUser/:userId',getAllFormForUser)

module.exports = router;
