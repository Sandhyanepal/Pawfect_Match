const { generateToken } = require("../config/jwtToken");
const { Individual, Organization, User } = require("../model");
const bcrypt = require("bcrypt");
const individualModel = require("../model/individualModel");

// Register User
const register = async (req, res) => {
  const {
    email,
    password,
    role,
    fullName,
    address,
    phone,
    orgName,
    licenseNumber,
  } = req.body

  try {
    // Check if the email is already registered
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered' })
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex')
    const verificationTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000)

    // Create a new user document in the User collection
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      role,
      verificationToken,
      verificationTokenExpiry,
    })
    const savedUser = await newUser.save()

    // Create additional details based on role
    if (role === 'Individual') {
      // Save Individual User details
      const individual = new Individual({
        userId: savedUser._id,
        fullName,
        address,
        phone,
      })
      await individual.save()
    } else if (role === 'Organization') {
      // Save Organization details
      const organization = new Organization({
        userId: savedUser._id,
        orgName,
        licenseNumber,
      })
      await organization.save()
    } else {
      return res.status(400).json({ message: "Invalid role provided" });
    }

    // Respond with success
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
    // console.error('Resend verification error:', error)
    // return res.status(500).json({
    //   success: false,
    //   message: 'Failed to resend verification email',
    //   error: error.message,
    // })
  }
}



// Login User
const loginUserCtrl = async (req, res) => {
  const { email, password } = req.body;
  const findUser = await User.findOne({ email });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    const hasPreferences =
      findUser.preferences?.age &&
      findUser.preferences?.gender &&
      findUser.preferences?.breed &&
      findUser.preferences?.category;
    const needsPreferences = !hasPreferences;

    return res.status(200).send({
      _id: findUser?._id,
      firstname: findUser?.firstname,
      lastname: findUser?.lastname,
      email: findUser?.email,
      password: findUser?.password,
      token: generateToken(findUser?._id),
      needsPreferences: needsPreferences,
    });
  } else {
    res.status(404).json({ msg: "Invalid Credentails" });
  }
};

// Get a single User
const getAUser = async (req, res) => {
  try {
    const getUser = await User.findById(req.body.userId).select("-password ");
    const getUserIndividual = await Individual.findOne({userId:req.body.userId})
    if (getUser) {
      return res.status(200).json({ data: getUser, success: true, userData:getUserIndividual });
    }
    return res.status(401).json({ success: false, msg: 'Unsuccessful' })
  } catch (err) {
    res.send(err)
  }
}

// Function to fetch user statistics
const getUserStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments()
    const totalIndividuals = await Individual.countDocuments()
    const totalOrganizations = await Organization.countDocuments()

    res.status(200).json({
      totalUsers,
      totalIndividuals,
      totalOrganizations,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error fetching user stats', error })
  }
}

// Get all Individual Users
const getAllIndividuals = async (req, res) => {
  try {
    // Fetch all individual users with their associated details
    const individuals = await Individual.find()
      .populate('userId', 'email') // Populate the 'userId' with email field
      .select('fullName address phone userId') // Select only necessary fields

    res.status(200).json(individuals)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error fetching individuals', error })
  }
}

// Delete an Individual User
const deleteIndividual = async (req, res) => {
  const { userId } = req.params
  try {
    // First, delete the Individual document
    const deletedIndividual = await Individual.findOneAndDelete({ userId })

    // Then, delete the associated User document
    if (deletedIndividual) {
      await User.findByIdAndDelete(userId)
      res.status(200).json({
        message: 'Individual and associated user deleted successfully',
      })
    } else {
      res.status(404).json({ message: 'Individual not found' })
    }
  } catch (err) {
    console.error(err)
    res
      .status(500)
      .json({ message: 'Error deleting individual user', error: err })
  }
}

// Get all Organization Users
const getAllOrganizations = async (req, res) => {
  try {
    // Fetch all organization users with their associated details
    const organizations = await Organization.find()
      .populate('userId', 'email') // Populate the 'userId' field with email from the User model
      .select('orgName licenseNumber userId') // Select necessary fields for the organization

    res.status(200).json(organizations)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error fetching organizations', error })
  }
}

// Delete an Organization
const deleteOrganization = async (req, res) => {
  const { orgId } = req.params // Retrieve the organization ID from the URL parameter

  try {
    // First, delete the Organization document
    const deletedOrganization = await Organization.findByIdAndDelete(orgId)

    // If the organization is found and deleted, then delete the associated User document
    if (deletedOrganization) {
      // Delete the associated User document
      await User.findByIdAndDelete(deletedOrganization.userId)

      res.status(200).json({
        message: 'Organization and associated user deleted successfully',
      })
    } else {
      res.status(404).json({ message: 'Organization not found' })
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Error deleting organization', error: err })
  }
};


// //Update a User
// const updateUser = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const updatedUser = await User.findByIdAndUpdate(
//       id,
//       {
//         firstname: req?.body?.firstname,
//         lastname: req?.body?.lastname,
//         email: req?.body?.email,
//         mobile: req?.body?.mobile,
//       },
//       {
//         new: true,
//       }
//     );
//     res.json(updatedUser);
//   } catch (err) {
//     res.send(err);
//   }
// };

const updatePreferences = async (req, res) => {
  const { userId, preferences } = req.body;

  try {
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user preferences
    user.preferences = preferences;
    await user.save();

    res.status(200).json({ message: "Preferences updated successfully" });
  } catch (error) {
    console.error("Error updating preferences:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// const sendAdoptionDetails = async (req, res) => {
//   try {
//     const { user, pet } = req.body;

  
//    const emailContent = `
//        <h1>Adoption Request Details</h1>
//        <h2>User Information:</h2>
//        <p><strong>Full Name:</strong> ${user.fullName}</p>
//       <p><strong>Date of Birth:</strong> ${user.dateOfBirth}</p>
//        <p><strong>Address:</strong> ${user.address}</p>
//        <p><strong>Phone Number:</strong> ${user.phoneNumber}</p>
//       <p><strong>Email:</strong> ${user.email}</p>
//       <p><strong>Occupation:</strong> ${user.occupation}</p>
//        <p><strong>Home Ownership:</strong> ${user.homeOwnership}</p>
//        <p><strong>Allergies:</strong> ${user.allergies}</p>

//        <h2>Pet Information:</h2>
//        <p><strong>Name:</strong> ${pet.name}</p>
//        <p><strong>Age:</strong> ${pet.age}</p>
//        <p><strong>Gender:</strong> ${pet.gender}</p>
//        <p><strong>Breed:</strong> ${pet.breed}</p>
//        <p><strong>Category:</strong> ${pet.category}</p>
//        <p><strong>Address:</strong> ${pet.address}</p>
//        <p><strong>Vaccination Status:</strong> ${pet.vaccination_status}</p>
//        <p><strong>Health Issues:</strong> ${pet.health_issue}</p>
//        <p><strong>Medication:</strong> ${pet.medication}</p>
//        <p><strong>Description:</strong> ${pet.description}</p>
//      `;


    
//     sendEmail({
//             from: "noreply@something.com",
//             to: req.body.email,
//             subject: "Adoption request",
//             text: "Adoption request",
//             html: emailContent,
//         })

//     res.status(200).json({ success: true, message: "Email sent successfully!" });
//   } catch (error) {
//     console.error("Error sending email:", error);
//     res.status(500).json({ success: false, message: "Failed to send email", error: error.message });
//   }
// };

const sendAdoptionDetails = async (req, res) => {
  try {
    const { fullName, dateOfBirth, address, phoneNumber, email, occupation, 
            homeOwnership, allergies, hasPets, currentPets } = req.body;

    // Get pet details from your database
    const pet = currentPets[0]; 

    // Construct email content
    const emailContent = `
      <h1>New Adoption Request</h1>
      <h2>Applicant Information:</h2>
      <p><strong>Full Name:</strong> ${fullName}</p>
      <p><strong>Date of Birth:</strong> ${dateOfBirth}</p>
      <p><strong>Address:</strong> ${address}</p>
      <p><strong>Phone Number:</strong> ${phoneNumber}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Occupation:</strong> ${occupation}</p>
      <p><strong>Home Ownership:</strong> ${homeOwnership}</p>
      <p><strong>Has Allergies:</strong> ${allergies ? 'Yes' : 'No'}</p>
      
      <h2>Pet Information:</h2>
      <p><strong>Name:</strong> ${pet.name}</p>
      <p><strong>Breed:</strong> ${pet.breed}</p>
      <p><strong>Age:</strong> ${pet.age}</p>
      <p><strong>Gender:</strong> ${pet.gender}</p>

      ${hasPets ? `
        <h2>Current Pets:</h2>
        ${currentPets.slice(1).map(pet => `
          <div>
            <p><strong>Species:</strong> ${pet.species}</p>
            <p><strong>Breed:</strong> ${pet.breed}</p>
            <p><strong>Age:</strong> ${pet.age}</p>
            <p><strong>Gender:</strong> ${pet.gender}</p>
            <p><strong>Vaccinated:</strong> ${pet.vaccinated ? 'Yes' : 'No'}</p>
          </div>
        `).join('')}
      ` : ''}
    `;

    // Find owner's email from the database
    // Assuming you have a User model and owner contains the owner's ID
    const User = require('../model').User;
    // const petOwner = await User.findById(owner);
    
    // if (!petOwner) {
    //   return res.status(404).json({ 
    //     success: false, 
    //     message: "Pet owner not found" 
    //   });
    // }

    // Send email to pet owner
    await transporter.sendMail({
      from: 'noreply@pawfectmatch.com',
      to: email,
      subject: "New Pet Adoption Request",
      html: emailContent,
    });

    // Send confirmation email to applicant
    await transporter.sendMail({
      from: 'noreply@pawfectmatch.com',
      to: email,
      subject: "Your Pet Adoption Application Received",
      html: `
        <h1>Thank you for your adoption application!</h1>
        <p>We have received your application and forwarded it to the pet owner. They will contact you soon.</p>
        <p>Pet details:</p>
        <p>Name: ${pet.name}</p>
        <p>Breed: ${pet.breed}</p>
      `
    });
    console.log('Emails sent successfully to Mailtrap');
    
    res.status(200).json({ 
      success: true, 
      message: "Adoption request sent successfully!" 
    });
  } catch (error) {
    console.error("Error sending adoption request:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to send adoption request", 
      error: error.message 
    });
  }
};

module.exports = {
  register,
  loginUserCtrl,
  getAUser,
  getUserStats,
  getAllIndividuals,
  deleteIndividual,
  getAllOrganizations,
  deleteOrganization,
  updatePreferences,
  sendAdoptionDetails
};
