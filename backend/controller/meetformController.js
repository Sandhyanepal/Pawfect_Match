const MeetForm = require("../model/meetformmodel");

const {sendEmail} = require("../middleware/emailSender"); 
const { request } = require("express");
const { User } = require("../model");

// Add Meetform (POST request to submit a form)
// exports.addMeetform = async (req, res) => {
//   try {
//     let filteredPets = req.body.currentPets.filter((pet) => {
//       return pet.species || pet.breed || pet.age || pet.vaccinated;
//     });

//     if (req.body.hasPets && filteredPets.length === 0) {
//       filteredPets = [];
//     }

//     const meetform = await MeetForm.create({
//       fullName: req.body.fullName,
//       dateOfBirth: req.body.dateOfBirth,
//       address: req.body.address,
//       phoneNumber: req.body.phoneNumber,
//       email: req.body.email,
//       occupation: req.body.occupation,
//       homeOwnership: req.body.homeOwnership,
//       allergies: req.body.allergies,
//       currentPets: filteredPets, 
//       termsAndConditions: req.body.termsAndConditions,
//       owner: req.body.owner,
//       petId: req.body.petId,
//     });

//     if (!meetform) {
//       return res
//         .status(400)
//         .json({ error: "Something went wrong. Could not submit the form." });
//     }

//     res.status(201).send(meetform);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Server error. Could not submit the form." });
//   }
// };
exports.addMeetform = async (req, res) => {
  try {
    let filteredPets = req.body.currentPets.filter((pet) => {
      return pet.species || pet.breed || pet.age || pet.vaccinated;
    });
    const ownerDetail = await User.findById(req.body.owner);
    // if (req.body.hasPets && filteredPets.length === 0) {
    //   filteredPets = [];
    // }
    // if (!req.body.owner ) {
    //   return res.status(400).json({ error: "Valid recipient email is required" });
    // }

    const meetform = await MeetForm.create({
      fullName: req.body.fullName,
      dateOfBirth: req.body.dateOfBirth,
      address: req.body.address,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      occupation: req.body.occupation,
      homeOwnership: req.body.homeOwnership,
      allergies: req.body.allergies,
      currentPets: filteredPets,
      termsAndConditions: req.body.termsAndConditions,
      owner: req.body.owner,
      petId: req.body.petId,
      userId:req.body.userId,
      status:req.body.status,
    });

    // if (!meetform) {
    //   return res
    //     .status(400)
    //     .json({ error: "Something went wrong. Could not submit the form." });
    // }

    const mailOptions = {
      from: "no-reply@petadoption.com",
      to: ownerDetail.email,
      subject: "New Meet Request for Your Pet",
      html: `
        <h1>Meet Request Details</h1>
        <p><strong>Full Name:</strong> ${req.body.fullName}</p>
        <p><strong>Email:</strong> ${req.body.email}</p>
        <p><strong>Phone Number:</strong> ${req.body.phoneNumber}</p>
        <p><strong>Address:</strong> ${req.body.address}</p>
        <p><strong>Occupation:</strong> ${req.body.occupation}</p>
        <p><strong>Home Ownership:</strong> ${req.body.homeOwnership}</p>
        <p><strong>Has Allergies:</strong> ${req.body.allergies ? "Yes" : "No"}</p>
        <p><strong>Terms Accepted:</strong> ${req.body.termsAndConditions ? "Yes" : "No"}</p>
        <h2>Pet Details</h2>
        ${filteredPets
          .map(
            (pet) =>
              `<p><strong>Species:</strong> ${pet.species || "N/A"}</p>
               <p><strong>Breed:</strong> ${pet.breed || "N/A"}</p>
               <p><strong>Age:</strong> ${pet.age || "N/A"}</p>
               <p><strong>Vaccinated:</strong> ${pet.vaccinated ? "Yes" : "No"}</p>`
          )
          .join("<br/>")}
      `,
    };
      await sendEmail(mailOptions);

    
    return res.status(201).json({data:meetform,success:true});
  } catch (err) {
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
      .staus(404)
      .json({ success: false, msg: "No Forms found for the User." });
  }
};
