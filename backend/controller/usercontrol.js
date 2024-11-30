const { generateToken } = require("../config/jwtToken")
const { Individual, Organization, User } = require("../model")
const bcrypt = require("bcrypt")

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
      return res.status(400).json({ message: "Email is already registered" })
    }

    // Hash the password
    // const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user document in the User collection
    const newUser = new User({
      fullName,
      email,
      password,
      role,
    })
    const savedUser = await newUser.save()

    // Create additional details based on role
    if (role === "Individual") {
      // Save Individual User details
      const individual = new Individual({
        userId: savedUser._id,
        fullName,
        address,
        phone,
      })
      await individual.save()
    } else if (role === "Organization") {
      // Save Organization details
      const organization = new Organization({
        userId: savedUser._id,
        orgName,
        licenseNumber,
      })
      await organization.save()
    } else {
      return res.status(400).json({ message: "Invalid role provided" })
    }

    // Respond with success
    res.status(201).json({ message: "User registered successfully" })
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({ message: "An error occurred during registration", error })
  }
}

// Login User
const loginUserCtrl = async (req, res) => {
  const { email, password } = req.body
  const findUser = await User.findOne({ email })
  if (findUser && (await findUser.isPasswordMatched(password))) {
    return res.status(200).send({
      _id: findUser?._id,
      firstname: findUser?.firstname,
      lastname: findUser?.lastname,
      email: findUser?.email,
      password: findUser?.password,
      token: generateToken(findUser?._id),
    })
    // console.log(findUser);
  } else {
    res.status(401).json({ msg: "Invalid Credentails" })
  }
}

// Get a single User
const getAUser = async (req, res) => {
  try {
    const getUser = await User.findById(req.body.userId).select("-password ")
    if (getUser) {
      return res.status(200).json({ data: getUser, success: true })
    }
    return res.status(401).json({ success: false, msg: "Unsuccessful" })
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
    res.status(500).json({ message: "Error fetching user stats", error })
  }
}

// Get all Individual Users
const getAllIndividuals = async (req, res) => {
  try {
    // Fetch all individual users with their associated details
    const individuals = await Individual.find()
      .populate("userId", "email") // Populate the 'userId' with email field
      .select("fullName address phone userId") // Select only necessary fields

    res.status(200).json(individuals)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Error fetching individuals", error })
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
      res
        .status(200)
        .json({
          message: "Individual and associated user deleted successfully",
        })
    } else {
      res.status(404).json({ message: "Individual not found" })
    }
  } catch (err) {
    console.error(err)
    res
      .status(500)
      .json({ message: "Error deleting individual user", error: err })
  }
}

// Get all Organization Users
const getAllOrganizations = async (req, res) => {
  try {
    // Fetch all organization users with their associated details
    const organizations = await Organization.find()
      .populate("userId", "email") // Populate the 'userId' field with email from the User model
      .select("orgName licenseNumber userId") // Select necessary fields for the organization

    res.status(200).json(organizations)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Error fetching organizations", error })
  }
}

// Delete an Organization
const deleteOrganization = async (req, res) => {
  const { orgId } = req.params // Retrieve the organization ID from the URL parameter

  try {
    // First, delete the Organization document
    const deletedOrganization = await Organization.findByIdAndDelete( orgId )

    // If the organization is found and deleted, then delete the associated User document
    if (deletedOrganization) {
      // Delete the associated User document
      await User.findByIdAndDelete(deletedOrganization.userId)

      res
        .status(200)
        .json({
          message: "Organization and associated user deleted successfully",
        })
    } else {
      res.status(404).json({ message: "Organization not found" })
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Error deleting organization", error: err })
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
module.exports = {
  register,
  loginUserCtrl,
  getAUser,
  getUserStats,
  getAllIndividuals,
  deleteIndividual,
  getAllOrganizations,
  deleteOrganization,
}
