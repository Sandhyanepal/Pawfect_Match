const MeetForm = require("../model/meetformmodel");

const {sendEmail} = require("../middleware/emailSender"); 
const { request } = require("express");
const { User, Individual } = require("../model");

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
        ${
          filteredPets.length > 0
            ? filteredPets
                .map(
                  (pet) => `
                    <p><strong>Species:</strong> ${pet.species || "N/A"}</p>
                    <p><strong>Breed:</strong> ${pet.breed || "N/A"}</p>
                    <p><strong>Age:</strong> ${pet.age || "N/A"}</p>
                    <p><strong>Vaccinated:</strong> ${pet.vaccinated ? "Yes" : "No"}</p>
                     ${
                  pet.image
                    ? `<p><strong>Image:</strong> <img src="${process.env.VITE_BACKEND_URL}/${pet.image.slice(
                        6
                      )}" alt="Pet Image" style="max-width: 100%; height: auto;" /></p>`
                    : `<p><strong>Image:</strong> N/A</p>`
                }                   
                  `
                )
                .join("<br/>")
            : "<p>No current pets listed.</p>"
        }
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
    const allRequest = await MeetForm.find({ owner: userId }).populate('petId') 
    .exec();;
    console.log(allRequest)
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


exports.handleAdoptionResponse = async (req, res) => {
  try {
    const { applicationId, status, petDetails, applicantDetails } = req.body;
    const owner = await User.findById(req.body.ownerId);
    // const owner = await User.findById(req.body.ownerId).select('fullName email phoneNumber')
    // console.log(req.body.ownerId);


    const ownerDetail = await Individual.findOne({userId:req.body.ownerId})
    console.log(ownerDetail)

    // Email template for approval
    const approvalEmail = {
      from: "no-reply@petadoption.com",
      to: applicantDetails.email,
      subject: "Your Pet Adoption Application Has Been Approved! 🎉",
      html: `
        <h1>Congratulations! Your Adoption Application Has Been Approved</h1>
        <p>Dear ${applicantDetails.fullName},</p>
        <p>We're delighted to inform you that your adoption application for ${petDetails.name} has been approved!</p>
        
        <h2>Next Steps:</h2>
        <ol>
          <li>Please contact the pet owner within 48 hours to arrange a meeting</li>
          <li>Owner's contact details:
            <ul>
              <li>Name: ${ownerDetail?.fullName}</li>
              <li>Email: ${owner.email}</li>
              <li>Phone: ${ownerDetail?.phone}</li>
            </ul>
          </li>
        </ol>

        <h2>Pet Details:</h2>
        <p><strong>Name:</strong> ${petDetails.name}</p>
        <p><strong>Breed:</strong> ${petDetails.breed}</p>
        <p><strong>Age:</strong> ${petDetails.age}</p>
        ${
          petDetails.image
            ? `<img src="${process.env.VITE_BACKEND_URL}/${petDetails.image.slice(6)}" 
                    alt="Pet Image" style="max-width: 300px; height: auto;" />`
            : ''
        }
      `
    };

    // Email template for decline
    const declineEmail = {
      from: "no-reply@petadoption.com",
      to: applicantDetails.email,
      subject: "Update on Your Pet Adoption Application",
      html: `
        <h1>Update on Your Adoption Application</h1>
        <p>Dear ${applicantDetails.fullName},</p>
        <p>Thank you for your interest in adopting ${petDetails.name}. After careful consideration, we regret to inform you that we cannot proceed with your adoption application at this time.</p>
        
        <p>We encourage you to:</p>
        <ul>
          <li>Browse other available pets on our platform</li>
          <li>Update your profile with additional information</li>
          <li>Reach out to our support team if you have any questions</li>
        </ul>

        <p>We wish you the best in your search for a perfect pet companion.</p>
      `
    };

    // Send appropriate email based on status
    if (status === 'approved') {
      await sendEmail(approvalEmail);
      
      // Also notify the owner
      const ownerNotification = {
        from: "no-reply@petadoption.com",
        to: owner.email,
        subject: "You've Approved an Adoption Application",
        html: `
          <h1>Adoption Application Approved</h1>
          <p>You have approved the adoption application for ${petDetails.name}.</p>
          <h2>Applicant Details:</h2>
          <p><strong>Name:</strong> ${applicantDetails.fullName}</p>
          <p><strong>Email:</strong> ${applicantDetails.email}</p>
          <p><strong>Phone:</strong> ${applicantDetails.phoneNumber}</p>
          <p>The applicant has been notified and will contact you soon.</p>
        `
      };
      await sendEmail(ownerNotification);
    } else if (status === 'declined') {
      await sendEmail(declineEmail);
    }

    return res.status(200).json({
      success: true,
      message: `Application ${status} successfully. Notifications sent.`
    });
  } catch (error) {
    console.error("Error handling adoption response:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to process adoption response",
      error: error.message
    });
  }
};


// exports.updateAdoptionStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status } = req.body;

//     // Find and update the form
//     const updatedForm = await MeetForm.findByIdAndUpdate(
//       id,
//       { status: status || 'declined' },
//       { new: true } // Return updated document
//     );

//     if (!updatedForm) {
//       return res.status(404).json({
//         success: false,
//         message: "Adoption form not found"
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Status updated successfully",
//       data: updatedForm
//     });
//   } catch (error) {
//     console.error("Error updating adoption status:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to update adoption status",
//       error: error.message
//     });
//   }
// };