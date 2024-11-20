const { generateToken } = require("../config/jwtToken")
const { Individual, Organization, User } = require("../model")
// const User = require("../model/usermodel");
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
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create a new user document in the User collection
    const newUser = new User({
      email,
      password: hashedPassword,
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

//Create a User
// const createUser = async (req, res) => {
//   const { email } = req.body;
//   const findUser = await User.findOne({ email });
//   if (!findUser) {
//     const newUser = await User.create(req.body);
//     res.json(newUser);
//   } else {
//     res.json({
//       msg: "User Already Exists",
//     });
//   }
// };

// Login User
// const loginUserCtrl = async (req, res) => {
//   const { email, password } = req.body;
//   const findUser = await User.findOne({ email });
//   if (findUser && (await findUser.isPasswordMatched(password))) {
//     res.send({
//       _id: findUser?._id,
//       firstname: findUser?.firstname,
//       lastname: findUser?.lastname,
//       email: findUser?.email,
//       password: findUser?.password,
//       token: generateToken(findUser?._id),
//     });
//     // console.log(findUser);
//   } else {
//     res.json({ msg: "Invalid Credentails" });
//   }
// };

//Get a single User
// const getAUser = async (req, res) => {
//   try {
//     const getUser = await User.findById(req.body.userId).select(
//       "-password -email"
//     );
//     res.json({ success: true, data: getUser });
//   } catch (err) {
//     res.send(err);
//   }
// };

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
  // createUser,
  // loginUserCtrl,
  // getAUser,
  // deleteAUser,
  // updateUser,
}
