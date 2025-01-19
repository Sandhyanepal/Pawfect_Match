const MeetForm = require("../model/meetformmodel");

// Add Meetform (POST request to submit a form)
exports.addMeetform = async (req, res) => {
  try {
    // Filter out empty pets if there are any
    let filteredPets = req.body.currentPets.filter((pet) => {
      // Only include pets that have at least one non-empty field
      return pet.species || pet.breed || pet.age || pet.vaccinated;
    });

    // If no pets are provided and 'hasPets' is true, set currentPets as an empty array
    if (req.body.hasPets && filteredPets.length === 0) {
      filteredPets = [];
    }

    const meetform = await MeetForm.create({
      fullName: req.body.fullName,
      dateOfBirth: req.body.dateOfBirth,
      address: req.body.address,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      occupation: req.body.occupation,
      homeOwnership: req.body.homeOwnership,
      allergies: req.body.allergies,
      currentPets: filteredPets, // Assuming currentPets is an array
      termsAndConditions: req.body.termsAndConditions,
      owner: req.body.owner,
      petId: req.body.petId,
      userId:req.body.userId,
      status:req.body.status
    });

    // If meetform creation fails, return an error
    if (!meetform) {
      return res
        .status(400)
        .json({ error: "Something went wrong. Could not submit the form." });
    }

    // Return the newly created meetform as a response
    res.status(201).send(meetform);
  } catch (err) {
    // Handle any errors during the form submission process
    console.error(err);
    res.status(500).json({ error: "Server error. Could not submit the form." });
  }
};

exports.getAllFormRequest = async (req, res) => {
  const { userId } = req.body;
  try {
    const allRequest = await MeetForm.find({ owner: userId });
    return res.status(200).json({ success: true, data: allRequest });
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, msg: "No Forms found for the User." });
  }
};

exports.getAllFormForUser = async(req,res)=>{
  const {userId} = req.params;
  try{
    const allRequest = await MeetForm.find({userId:userId});
    if(allRequest){
      return res.status(200).json({success:true,data:allRequest})
    }else{
      return res.status(404).json({success:false,msg:'No forms found!!!'})
    }
  }catch(error){
    return res.status(404).json({success:false,msg:'No forms found!!!'})
  }
}
