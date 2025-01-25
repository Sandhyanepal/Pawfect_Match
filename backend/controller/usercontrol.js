const { generateToken } = require('../config/jwtToken')
const { Individual, Organization, User } = require('../model')
const bcrypt = require('bcrypt')
const Token = require('../model/token')
const { sendEmail } = require('../middleware/emailSender')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

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
    console.log(email,password,role,fullName,address,phone,orgName,licenseNumber)
    // Check if the email is already registered
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered' })
    }

    // Create a new user document in the User collection
    const newUser = new User({
      email,
      password,
      role,
    })

    // Log to verify what's being saved
    console.log('About to save user:', {
      email: newUser.email,
      hasPassword: !!newUser.password,
      role: newUser.role,
    })

    const savedUser = await newUser.save()

    console.log('Saved user:', {
      id: savedUser._id,
      email: savedUser.email,
      hasPassword: !!savedUser.password,
    })

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
      return res.status(400).json({ message: 'Invalid role provided' })
    }

    // Respond with success
    res.status(201).json({
      message:
        'User registered successfully. Verification email send to your email.',
    })

    // Generate Token
    const token = await Token.create({
      token: crypto.randomBytes(24).toString('hex'),
      user: savedUser._id,
    })
    if (!token) {
      return console.log('Failed to generate token')
    }

    // Send Verification Email
    const URL = `http://localhost:5002/verify/${token.token}`
    sendEmail({
      from: 'noreply@something.com',
      to: req.body.email,
      subject: 'Verification Email',
      text:
        'Please copy the following link in the browser to verify your email' +
        URL,
      html: `<a href='${URL}'><button>Verify Email</button></a>`,
    })
  } catch (error) {
    console.error(error)
    console.error('Registration Error:', error)
    res
      .status(500)
      .json({ message: 'An error occurred during registration', error })
  }
}

// VERIFY EMAIL
const verifyEmail = async (req, res) => {
  // Check if token is correct or not
  let token = await Token.findOne({ token: req.params.token })
  if (!token) {
    res.status(400).json({ error: 'Token not found, or may have expired' })
  }

  // find user associated with token
  let user = await User.findById(token.user)
  if (!user) {
    res.status(400).json({ error: 'User not found' })
  }

  // Check if user is already verified
  if (user.isVerified) {
    return res
      .status(400)
      .json({ error: 'User already verified. Login to continue' })
  }

  // Verify User
  user.isVerified = true
  user = await user.save()
  if (!user) {
    res.status(400).json({ error: 'Failed to verify, please try again later' })
  }
  res.send({ message: 'User verified successfully' })
}

// TO RESEND VERIFICATION EMAIL
const resendVerification = async (req, res) => {
  // check if email is registered or not
  let user = await User.findOne({ email: req.body.email })
  console.log(user)
  if (!user) {
    return res.status(400).json({ error: 'Email not registered' })
  }
  // Generate Token
  const token = await Token.create({
    token: crypto.randomBytes(24).toString('hex'),
    user: user._id,
  })
  if (!token) {
    return console.log('Failed to generate token')
  }

  // Send Verification Email
  const URL = `http://localhost:5002/verify/${token.token}`
  sendEmail({
    from: 'noreply@something.com',
    to: req.body.email,
    subject: 'Verification Email',
    text:
      'Please copy the following link in the browser to verify your email' +
      URL,
    html: `<a href='${URL}'><button>Verify Email</button></a>`,
  })

  res.send({ message: 'Verification link has been send to your email' })
}

// FORGET PASSWORD
const forgetPassword = async (req, res) => {
  // check if email exist
  let user = await User.findOne({ email: req.body.email })
  if (!user) {
    return res.status(400).json({ error: 'Email not registered' })
  }
  // Generate Token
  const token = await Token.create({
    token: crypto.randomBytes(24).toString('hex'),
    user: user._id,
  })
  if (!token) {
    return console.log('Failed to generate token')
  }
  // send password reset link in email
  const URL = `http://localhost:5002/resetpassword/${token.token}`
  sendEmail({
    from: 'noreply@something.com',
    to: req.body.email,
    subject: 'Password Reset link',
    text:
      'Please copy the following link in the browser to reset password' + URL,
    html: `<a href='${URL}'><button>Reset Password</button></a>`,
  })
  res.send({ message: 'Password reset link has been send to your email' })
}

// TO RESET PASSWORD
const resetPassword = async (req, res) => {
  try {
    const { token } = req.params

    // Find valid token
    let resetToken = await Token.findOne({ token: req.params.token })
    if (!resetToken) {
      return res.status(400).json({
        success: false,
        message: 'Invalid token or token may have expired',
      })
    }

    // Find user
    let user = await User.findById(resetToken.user)
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'User not found',
      })
    }

    // If it's a GET request, just validate token
    if (req.method === 'GET') {
      return res.status(200).json({
        success: true,
        message: 'Token is valid',
      })
    }

    // If it's a POST request, update password
    if (req.method === 'POST') {
      if (!req.body.password) {
        return res.status(400).json({
          success: false,
          message: 'Password is required',
        })
      }

      // Update user's password - this will trigger the pre-save hook
      user.password = req.body.password
      await user.save()

      // Delete the used token
      await resetToken.deleteOne()

      return res.status(200).json({
        success: true,
        message: 'Password has been changed successfully',
      })
    }
  } catch (error) {
    console.error('Reset Password Error:', error)
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
}

// Login User

const loginUserCtrl = async (req, res) => {
  try {
    const { email, password } = req.body

    // First check if user exists
    const findUser = await User.findOne({ email })
    if (!findUser) {
      return res.status(404).json({ error: 'User not found. Please register.' })
    }

    // Then check if user is verified
    // if (!findUser.isVerified) {
    //   return res.status(400).json({ error: 'User Not Verified' })
    // }

    // Verify password using bcrypt
    const isPasswordCorrect = await bcrypt.compare(password, findUser.password)
    if (!isPasswordCorrect) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    // Check preferences
    const hasPreferences =
      findUser.preferences?.age &&
      findUser.preferences?.gender &&
      findUser.preferences?.breed &&
      findUser.preferences?.category
    const needsPreferences = !hasPreferences

    // Generate token and send response
    return res.status(200).json({
      _id: findUser._id,
      fullName: findUser.fullName,
      email: findUser.email,
      token: generateToken(findUser._id),
      needsPreferences: needsPreferences,
    })
  } catch (error) {
    console.error('Login Error:', error)
    return res.status(500).json({
      error: 'An error occurred during login. Please try again later.',
    })
  }
}

// const loginUserCtrl = async (req, res) => {
//   const { email, password } = req.body
//   const findUser = await User.findOne({ email })

//   if (!findUser.isVerified) {
//     return res.status(400).json({ error: 'User Not Verified' })
//   }

//   // generate login token
//   // const token = jwt.sign(
//   //   {
//   //     _id: findUser._id,
//   //     role: findUser.role,
//   //     fullName: findUser.fullName,
//   //     email: findUser.email,
//   //   },
//   //   process.env.JWT_SECRET
//   // )

//   if (findUser && (await findUser.isPasswordMatched(password))) {
//     const hasPreferences =
//       findUser.preferences?.age &&
//       findUser.preferences?.gender &&
//       findUser.preferences?.breed &&
//       findUser.preferences?.category
//     const needsPreferences = !hasPreferences

//     return res.status(200).send({
//       _id: findUser?._id,
//       fullName: findUser?.fullName,
//       email: findUser?.email,
//       // password: findUser?.password,
//       token: generateToken(findUser?._id),
//       needsPreferences: needsPreferences,
//     })
//   } else {
//     res.status(404).json({ msg: 'Invalid Credentials' })
//   }
// }

// const loginUserCtrl = async (req, res) => {
//   try {
//     const { email, password } = req.body

//     // Check if the user exists
//     const user = await User.findOne({ email })
//     if (!user) {
//       return res.status(404).json({ error: 'User not found. Please register.' })
//     }

//     // Check if user is verified
//     if (!user.isVerified) {
//       return res.status(400).json({
//         error: 'User not verified. Check your email for verification link.',
//       })
//     }

//     // Check if password matches
//     // const isMatch = await user.isPasswordMatched(password)
//     // if (!isMatch) {
//     //   return res
//     //     .status(401)
//     //     .json({ error: 'Invalid credentials. Please try again.' })
//     // }
//     // Compare passwords
//     const isPasswordCorrect = await bcrypt.compare(password, user.password)
//     if (!isPasswordCorrect) {
//       return res
//         .status(401)
//         .json({ error: 'Invalid credentials. Please try again.' })
//     }

//     // Generate JWT Token
//     // const token = jwt.sign(
//     //   {
//     //     _id: user._id,
//     //     role: user.role,
//     //     fullName: user.fullName,
//     //     email: user.email,
//     //   },
//     //   process.env.JWT_SECRET,
//     //   { expiresIn: '1d' } // Set token expiration time
//     // )
//     // Generate a JWT token
//     const token = generateToken(user)

//     // Check if user has preferences
//     const hasPreferences =
//       user.preferences?.age &&
//       user.preferences?.gender &&
//       user.preferences?.breed &&
//       user.preferences?.category
//     const needsPreferences = !hasPreferences

//     return res.status(200).json({
//       _id: user._id,
//       fullName: user.fullName,
//       email: user.email,
//       token,
//       needsPreferences,
//     })
//   } catch (error) {
//     console.error('Login Error:', error)
//     return res.status(500).json({
//       error: 'An error occurred during login. Please try again later.',
//     })
//   }
// }

// Get a single User
const getAUser = async (req, res) => {
  try {
    const getUser = await User.findById(req.body.userId).select('-password ')
    if (getUser) {
      return res.status(200).json({ data: getUser, success: true })
    }
    return res.status(401).json({ success: false, msg: 'Unsuccessful' })
  } catch (err) {
    res.send(err)
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
}

// //Deleta a user
// const deleteAUser = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const deleteUser = await User.findByIdAndDelete(id);
//     res.json(deleteUser);
//   } catch (err) {
//     res.send(err);
//   }
// };

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
  const { userId, preferences } = req.body

  try {
    let user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Update user preferences
    user.preferences = preferences
    await user.save()

    res.status(200).json({ message: 'Preferences updated successfully' })
  } catch (error) {
    console.error('Error updating preferences:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

const sendAdoptionDetails = async (req, res) => {
  try {
    const {
      fullName,
      dateOfBirth,
      address,
      phoneNumber,
      email,
      occupation,
      homeOwnership,
      allergies,
      hasPets,
      currentPets,
    } = req.body

    // Get pet details from your database
    const pet = currentPets[0]

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

      ${
        hasPets
          ? `
        <h2>Current Pets:</h2>
        ${currentPets
          .slice(1)
          .map(
            (pet) => `
          <div>
            <p><strong>Species:</strong> ${pet.species}</p>
            <p><strong>Breed:</strong> ${pet.breed}</p>
            <p><strong>Age:</strong> ${pet.age}</p>
            <p><strong>Gender:</strong> ${pet.gender}</p>
            <p><strong>Vaccinated:</strong> ${pet.vaccinated ? 'Yes' : 'No'}</p>
          </div>
        `
          )
          .join('')}
      `
          : ''
      }
    `

    // Find owner's email from the database
    // Assuming you have a User model and owner contains the owner's ID
    const User = require('../model').User
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
      subject: 'New Pet Adoption Request',
      html: emailContent,
    })

    // Send confirmation email to applicant
    await transporter.sendMail({
      from: 'noreply@pawfectmatch.com',
      to: email,
      subject: 'Your Pet Adoption Application Received',
      html: `
        <h1>Thank you for your adoption application!</h1>
        <p>We have received your application and forwarded it to the pet owner. They will contact you soon.</p>
        <p>Pet details:</p>
        <p>Name: ${pet.name}</p>
        <p>Breed: ${pet.breed}</p>
      `,
    })
    console.log('Emails sent successfully to Mailtrap')

    res.status(200).json({
      success: true,
      message: 'Adoption request sent successfully!',
    })
  } catch (error) {
    console.error('Error sending adoption request:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to send adoption request',
      error: error.message,
    })
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

const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user.userId

    const totalPets = await Pet.countDocuments({ owner: userId })
    const pendingAdoptionRequests = await Adoption.countDocuments({
      status: 'Pending',
      pet: { $in: await Pet.find({ owner: userId }).distinct('_id') },
    })

    res.status(200).json({
      totalPets,
      pendingAdoptionRequests,
    })
  } catch (error) {
    console.error('Dashboard stats error:', error)
    res.status(500).json({
      message: 'Error fetching dashboard statistics',
      error: error.message,
    })
  }
}

module.exports = {
  register,
  verifyEmail,
  resendVerification,
  forgetPassword,
  resetPassword,
  loginUserCtrl,
  getAUser,
  getUserStats,
  getAllIndividuals,
  deleteIndividual,
  getAllOrganizations,
  deleteOrganization,
  updatePreferences,
  sendAdoptionDetails,
  getDashboardStats,
}
