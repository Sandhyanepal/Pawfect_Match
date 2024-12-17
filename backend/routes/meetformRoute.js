const express = require("express");
const { addMeetform } = require("../controller/meetformController");
const MeetForm = require("../model/meetformmodel"); 

const router = express.Router();

router.post('/submitform', addMeetform)


router.get("/api/meetforms", async (req, res) => {
    try {
      const meetforms = await MeetForm.find(); // Fetch all MeetForm records
      res.status(200).json(meetforms); // Send data as JSON
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch meetform data." });
    }
  });

module.exports = router;
