const Pet = require("../model/petmodel")

// Add Pets
exports.addPet = async (req, res) => {
  try {
    let pet = await Pet.create({
      name: req.body.name,
      age: req.body.age,
      gender: req.body.gender,
      breed: req.body.breed,
      category: req.body.category,
      address: req.body.address,
      owner: req.body.owner,
      vaccination_status: req.body.vaccination_status,
      health_issue: req.body.health_issue,
      medication: req.body.medication,
      image: req.file?.path,
    })
    // If pet creation fails, return an error
    if (!pet) {
      return res
        .status(400)
        .json({ error: "Something went wrong. Could not add pet." })
    }
    // Return the newly created pet as a response
    res.send(pet)
  } catch (err) {
    // Handle any errors that occur during the process
    console.error(err)
    res.status(500).json({ error: "Server error. Could not add pet." })
  }
}

// Get all pets
exports.getAllPets = async (req, res) => {
  try {
    const pets = await Pet.find()
      .populate("owner", "orgName") // Populate owner with 'name' only
      .populate("category", "category_name")
    res.status(200).json({
      success: true,
      message: "Pets fetched successfully",
      data: pets,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch pets",
      error: error.message,
    })
  }
}

//get all post
// exports.getAllPets = async (req, res) => {
//   let pets = await Pet.find()
//   // .populate('userId').populate('category')
//   if (!pets) {
//       return res.status(400).json({ error: "Something went wrong" });
//   }
//   res.send(pets);
// }

// module. = {
//   getAllPets,
// };
