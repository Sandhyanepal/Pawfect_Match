const express = require("express");
const { addMeetform } = require("../controller/meetformController");

const router = express.Router();

router.post('/submitform', addMeetform)

module.exports = router;
