//sandhya ko ho yo

const { generateToken } = require('../config/jwtToken')
const { Individual, Organization, User } = require('../model')
const bcrypt = require('bcrypt')
const sendEmail = require('../middleware/emailSender')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

// Utility function to generate tokens with consistent configuration
// const generateAuthToken = (userId, expiresIn = '1h') => {
//   return jwt.sign({ id: userId }, process.env.JWT_KEY, { expiresIn })
// }

// Helper function to send verification email
const sendVerificationEmail = async (email, token) => {
  const verificationLink = `http://localhost:5002/verify-email/${token}`

  await sendEmail({
    from: 'noreply@something.com',
    to: email,
    subject: 'Verify your email',
    html: `
      <h1>Email Verification</h1>
      <p>Please click the link below to verify your email:</p>
      <a href="${verificationLink}">${verificationLink}</a>
      <p>This link will expire in 24 hours.</p>
    `,
  })
}

// Helper function to send reset password email
const sendResetPasswordEmail = async (email, token) => {
  const resetLink = `http://localhost:5002/reset-password/${token}`

  await sendEmail({
    from: 'noreply@something.com',
    to: email,
    subject: 'Reset Password',
    html: `
      <h1>Reset Password</h1>
      <p>Please click the link below to reset your password:</p>
      <a href="${resetLink}">${resetLink}</a>
      <p>This link will expire in 1 hour.</p>
    `,
  })
}

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
      return res.status(400).json({ message: 'Invalid role provided' })
    }

    await sendVerificationEmail(email, verificationToken)

    res.status(201).json({
      message:
        'Registration successful. Please check your email to verify your account.',
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}
// const token = generateToken(savedUser._id)

// Respond with success
// res.status(201).json({ message: 'User registered successfully' })

//     const URL = `http://localhost:5002/verify/${token}`
//     sendEmail({
//       from: 'noreply@something.com',
//       to: req.body.email,
//       subject: 'Verification Email',
//       text:
//         'Please copy the following link in the browser to verify your email' +
//         URL,
//       html: `<a href='${URL}'><button>Verify Email</button></a>`,
//     })
//   } catch (error) {
//     console.error(error)
//     res
//       .status(500)
//       .json({ message: 'An error occurred during registration', error })
//   }
// }

// VERIFY EMAIL
// const verifyEmail = async (req, res) => {
//   try {
//     // Extract the token from the request parameters
//     const tokenParam = req.params.token
//     if (!tokenParam) {
//       return res.status(400).json({ error: 'Token is required' })
//     }

//     // Verify the token
//     const decoded = jwt.verify(tokenParam, process.env.JWT_KEY)

//     // Find the user associated with the token
//     const user = await User.findById(decoded.id)
//     if (!user) {
//       return res.status(400).json({ error: 'User not found' })
//     }

//     // Check if the user is already verified
//     if (user.isVerified) {
//       return res
//         .status(400)
//         .json({ error: 'User already verified. Login to continue' })
//     }
//     // Mark the user as verified
//     user.isVerified = true
//     await user.save()

//     res.status(200).json({ message: 'User verified successfully' })
//   } catch (error) {
//     console.error(error)
//     if (error.name === 'JsonWebTokenError') {
//       res.status(400).json({ error: 'Invalid or expired token' })
//     } else {
//       res.status(500).json({ error: 'Internal server error' })
//     }
//   }
// }
const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params

    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpiry: { $gt: Date.now() },
    })

    if (!user) {
      return res
        .status(400)
        .json({ message: 'Invalid or expired verification token' })
    }

    user.isVerified = true
    user.verificationToken = undefined
    user.verificationTokenExpiry = undefined
    await user.save()

    res.json({ message: 'Email verified successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
    // if (error.name === 'TokenExpiredError') {
    //   return res.status(401).json({
    //     success: false,
    //     message: 'Verification link has expired. Please request a new one.',
    //   })
    // }
    // if (error.name === 'JsonWebTokenError') {
    //   return res.status(401).json({
    //     success: false,
    //     message: 'Invalid verification token',
    //   })
    // }
    // return res.status(500).json({
    //   success: false,
    //   message: 'Email verification failed',
    //   error: error.message,
    // })
  }
}

// Resend Verification Email Route
// const resendVerification = async (req, res) => {
//   const { email } = req.body

//   try {
//     // Find the user by email
//     const user = await User.findOne({ email })
//     if (!user) {
//       return res.status(400).json({ error: 'Email not registered' })
//     }

//     // Check if the user is already verified
//     if (user.isVerified) {
//       return res.status(400).json({ error: 'User already verified' })
//     }

//     // Generate a new verification token
//     const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
//       expiresIn: '1h',
//     })

//     // Send the verification email with the token
//     const URL = `http://localhost:5002/verify/${token}`
//     sendEmail({
//       from: 'noreply@something.com',
//       to: email,
//       subject: 'Email Verification',
//       text: `Please verify your email by clicking on the following link: ${URL}`,
//       html: `<a href="${URL}"><button>Verify Email</button></a>`,
//     })

//     res.status(200).json({ message: 'Verification email sent' })
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({ error: 'Internal server error' })
//   }
// }
const resendVerification = async (req, res) => {
  try {
    const { email } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    if (user.isVerified) {
      return res.status(400).json({ message: 'Email is already verified' })
    }

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required',
      })
    }

    // const user = await User.findOne({ email })
    // if (!user) {
    //   return res.status(404).json({
    //     success: false,
    //     message: 'User not found',
    //   })
    // }

    // if (user.isVerified) {
    //   return res.status(400).json({
    //     success: false,
    //     message: 'Email is already verified',
    //   })
    // }

    // Generate new verification token
    const verificationToken = crypto.randomBytes(32).toString('hex')
    const verificationTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000)
    // Generate new verification token
    // const verificationToken = generateAuthToken(user._id, '1h')

    user.verificationToken = verificationToken
    user.verificationTokenExpiry = verificationTokenExpiry
    await user.save()

    await sendVerificationEmail(email, verificationToken)

    // Send verification email
    // const verificationUrl = `http://localhost:5002/verify/${verificationToken}`
    // await sendEmail({
    //   from: process.env.EMAIL_FROM || 'noreply@something.com',
    //   to: email,
    //   subject: 'Email Verification',
    //   html: `
    //     <h2>Verify Your Email</h2>
    //     <p>Please click the button below to verify your email address:</p>
    //     <a href="${verificationUrl}" style="padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">
    //       Verify Email
    //     </a>
    //     <p>If the button doesn't work, copy and paste this link in your browser:</p>
    //     <p>${verificationUrl}</p>
    //     <p>This link will expire in 1 hour.</p>
    //   `,
    // })

    res.json({ message: 'Verification email resent successfully' })
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

// forget Password
// const forgetPassword = async (req, res) => {
//   const { email } = req.body

//   try {
//     // Find the user by email
//     const user = await User.findOne({ email })
//     if (!user) {
//       return res.status(400).json({ error: 'Email not registered' })
//     }

//     // Generate a reset password token
//     const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
//       expiresIn: '1h',
//     })

//     // Send the reset password email with the token
//     const URL = `http://localhost:5002/resetpassword/${token}`
//     sendEmail({
//       from: 'noreply@something.com',
//       to: email,
//       subject: 'Password Reset',
//       text: `Please click the following link to reset your password: ${URL}`,
//       html: `<a href="${URL}"><button>Reset Password</button></a>`,
//     })

//     res.status(200).json({ message: 'Password reset link sent to your email' })
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({ error: 'Internal server error' })
//   }
// }

// rest password
// const resetPassword = async (req, res) => {
//   const { token } = req.params // Reset token from the URL
//   const { newPassword } = req.body // New password from the user

//   try {
//     // Verify the reset token
//     const decoded = jwt.verify(token, process.env.JWT_KEY)

//     // Find the user by ID from the decoded token
//     const user = await User.findById(decoded.id)
//     if (!user) {
//       return res.status(400).json({ error: 'User not found' })
//     }

//     // Hash the new password
//     const hashedPassword = await bcrypt.hash(newPassword, 10)

//     // Update the user's password
//     user.password = hashedPassword
//     await user.save()

//     res.status(200).json({ message: 'Password reset successfully' })
//   } catch (error) {
//     console.error(error)
//     res.status(400).json({ error: 'Invalid or expired token' })
//   }
// }
// const resetPassword = async (req, res) => {
//   try {
//     const { token } = req.params
//     const { newPassword } = req.body

//     if (!token || !newPassword) {
//       return res.status(400).json({
//         success: false,
//         message: 'Token and new password are required',
//       })
//     }

//     // Verify reset token
//     const decoded = jwt.verify(token, process.env.JWT_KEY)

//     // Find user and update password
//     const user = await User.findById(decoded.id)
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: 'User not found',
//       })
//     }

//     // Hash new password
//     const hashedPassword = await bcrypt.hash(newPassword, 10)
//     user.password = hashedPassword
//     await user.save()

//     return res.status(200).json({
//       success: true,
//       message: 'Password reset successful',
//     })
//   } catch (error) {
//     if (error.name === 'TokenExpiredError') {
//       return res.status(401).json({
//         success: false,
//         message: 'Password reset link has expired. Please request a new one.',
//       })
//     }
//     if (error.name === 'JsonWebTokenError') {
//       return res.status(401).json({
//         success: false,
//         message: 'Invalid reset token',
//       })
//     }
//     return res.status(500).json({
//       success: false,
//       message: 'Password reset failed',
//       error: error.message,
//     })
//   }
// }
// const resetPassword = async (req, res) => {
//   try {
//     const { token } = req.params
//     const { newPassword } = req.body

//     // Detailed validation
//     if (!token) {
//       return res.status(400).json({
//         success: false,
//         message: 'Reset token is missing',
//       })
//     }

//     if (!newPassword) {
//       return res.status(400).json({
//         success: false,
//         message: 'New password is required',
//       })
//     }

//     // Verify token
//     const decoded = jwt.verify(token, process.env.JWT_KEY)

//     // Find user
//     const user = await User.findById(decoded.id)
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: 'User not found',
//       })
//     }

//     // Hash and update password
//     const hashedPassword = await bcrypt.hash(newPassword, 10)
//     user.password = hashedPassword
//     await user.save()

//     return res.status(200).json({
//       success: true,
//       message: 'Password reset successful',
//     })
//   } catch (error) {
//     console.error('Reset password error:', error)

//     if (error.name === 'TokenExpiredError') {
//       return res.status(401).json({
//         success: false,
//         message: 'Password reset link has expired. Please request a new one.',
//       })
//     }

//     if (error.name === 'JsonWebTokenError') {
//       return res.status(401).json({
//         success: false,
//         message: 'Invalid reset token',
//       })
//     }

//     return res.status(500).json({
//       success: false,
//       message: 'Password reset failed',
//       error: error.message,
//     })
//   }
// }

// Login User
// const loginUserCtrl = async (req, res) => {
//   const { email, password } = req.body
//   const findUser = await User.findOne({ email })
//   if (findUser && (await findUser.isPasswordMatched(password))) {
//     return res.status(200).send({
//       _id: findUser?._id,
//       firstname: findUser?.firstname,
//       lastname: findUser?.lastname,
//       email: findUser?.email,
//       password: findUser?.password,
//       token: generateToken(findUser?._id),
//     })
//   } else {
//     res.status(404).json({ msg: 'Invalid Credentails' })
//   }
// }
const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    if (!user.isVerified) {
      return res
        .status(401)
        .json({ message: 'Please verify your email before logging in' })
    }

    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const token = generateToken(user._id)
    res.json({ token })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// forget password
const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required',
      })
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex')
    const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

    // Generate password reset token
    // const resetToken = generateAuthToken(user._id, '1h')
    // const resetToken = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
    //   expiresIn: '1h',
    // })

    user.resetPasswordToken = resetToken
    user.resetPasswordExpiry = resetTokenExpiry

    // Send reset email
    // const resetUrl = `http://localhost:5002/reset-password/${resetToken}`
    // await sendEmail({
    //   from: 'noreply@something.com',
    //   to: email,
    //   subject: 'Password Reset Request',
    //   html: `
    //     <h2>Reset Your Password</h2>
    //     <p>You requested to reset your password. Click the button below to proceed:</p>
    //     <a href="${resetUrl}" style="padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">
    //       Reset Password
    //     </a>
    //     <p>If the button doesn't work, copy and paste this link in your browser:</p>
    //     <p>${resetUrl}</p>
    //     <p>This link will expire in 1 hour.</p>
    //     <p>If you didn't request this, please ignore this email.</p>
    //   `,
    // })

    await sendResetPasswordEmail(email, resetToken)

    return res.status(200).json({
      success: true,
      message: 'Password reset link sent successfully',
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
    // console.error('Forget password error:', error)
    // return res.status(500).json({
    //   success: false,
    //   message: 'Failed to process password reset request',
    //   error: error.message,
    // })
  }
}

// reset password
const resetPassword = async (req, res) => {
  try {
    const { token } = req.params
    const { password } = req.body

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiry: { $gt: Date.now() },
    })

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired reset token' })
    }

    // In production, hash the new password
    user.password = hashedPassword
    user.resetPasswordToken = undefined
    user.resetPasswordExpiry = undefined
    await user.save()

    res.json({ message: 'Password reset successful' })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
    // if (error.name === 'TokenExpiredError') {
    //   return res.status(401).json({
    //     success: false,
    //     message: 'Password reset link has expired. Please request a new one.',
    //   })
    // }

    // if (error.name === 'JsonWebTokenError') {
    //   return res
    //     .status(401)
    //     .json({ success: false, message: 'Invalid reset token' })
    // }

    // return res.status(500).json({
    //   success: false,
    //   message: 'Password reset failed',
    //   error: error.message,
    // })
  }
}

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
}

module.exports = {
  register,
  verifyEmail,
  resendVerification,
  forgetPassword,
  resetPassword,
  login,
  getAUser,
  getUserStats,
  getAllIndividuals,
  deleteIndividual,
  getAllOrganizations,
  deleteOrganization,
}
