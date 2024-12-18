const express = require("express");
const {
  addMeetform,
  getAllFormRequest,
} = require("../controller/meetformController");

const router = express.Router();

router.post("/submitform", addMeetform);
router.post("/getAllFormRequest", getAllFormRequest);

module.exports = router;
