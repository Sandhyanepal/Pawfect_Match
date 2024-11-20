const MeetForm = require('../model/meetformmodel')

// Add Meetform (POST request to submit a form)
exports.addMeetform = async (req, res) => {
    try {
      const meetform = await MeetForm.create({
        fullName: req.body.fullName,
        dateOfBirth: req.body.dateOfBirth,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        occupation: req.body.occupation,
        homeOwnership: req.body.homeOwnership,
        allergies: req.body.allergies,
        currentPets: req.body.currentPets, // Assuming currentPets is an array
        termsAndConditions: req.body.termsAndConditions,
      });
  
      // If meetform creation fails, return an error
      if (!meetform) {
        return res.status(400).json({ error: "Something went wrong. Could not submit the form." });
      }
  
      // Return the newly created meetform as a response
      res.status(201).send(meetform);
    } catch (err) {
      // Handle any errors during the form submission process
      console.error(err);
      res.status(500).json({ error: "Server error. Could not submit the form." });
    }
  };