const Pet = require("../model/petmodel");

// Add Pets
exports.addPet = async (req, res) => {
  try {
    // console.log(
    //   req.body.name,
    //   req.body.age,
    //   req.body.gender,
    //   req.body.breed,
    //   req.body.category,
    //   req.body.address,
    //   req.body.owner,
    //   req.body.vaccination_status,
    //   req.body.health_issue,
    //   req.body.medication,
    //   req.file?.path.replace(/\\/g, "/"),
    //   req.body?.description
    // );
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
      image: req.file?.path.replace(/\\/g, "/"),
      description: req.body?.description,
    });
    // If pet creation fails, return an error
    if (!pet) {
      return res
        .status(400)
        .json({ error: "Something went wrong. Could not add pet." });
    }
    // Return the newly created pet as a response
    res.status(200).json({ success: true, data: pet });
  } catch (err) {
    // Handle any errors that occur during the process
    console.error(err);
    res.status(500).json({ error: "Server error. Could not add pet." });
  }
};

// Get all pets
exports.getAllPets = async (req, res) => {
  try {
    const pets = await Pet.find()
      .populate("owner", "orgName") // Populate owner with 'name' only
      .populate("category", "category_name");
    res.status(200).json({
      success: true,
      message: "Pets fetched successfully",
      data: pets,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch pets",
      error: error.message,
    });
  }
};

exports.deletePet = async (req, res) => {
  try {
    const { id } = req.params;
    await Pet.findByIdAndDelete(id);
    return res.json({ msg: "pet Delted Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};

const path = require("path");
const fs = require("fs");

exports.editPet = async (req, res) => {
  try {
    const { id } = req.params;
    const existingPet = await Pet.findById(id);
    if (!existingPet)
      return res.status(404).json({ message: "Pet not found!" });

    const updatedData = { ...req.body };

    if (req.file) {
      if (existingPet.image) {
        const oldImagePath = path.join(__dirname, "../", existingPet.image);
        if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
      }
      updatedData.image = req.file.path;
    } else {
      updatedData.image = existingPet.image;
    }

    const updatedPet = await Pet.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (!updatedPet)
      return res.status(400).json({ message: "Failed to update pet!" });

    res
      .status(200)
      .json({ message: "Pet updated successfully!", data: updatedPet });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred!", error: error.message });
  }
};

// Get single pet by ID
exports.getSinglePet = async (req, res) => {
  try {
    const petId = req.params.id;

    // Fetch the pet by ID and populate references
    const pet = await Pet.findById(petId)
      .populate("owner", "orgName") // Populate owner with 'orgName'
      .populate("category", "category_name"); // Populate category with 'category_name'
    if (!pet) {
      return res.status(404).json({
        success: false,
        message: "Pet not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Pet fetched successfully",
      data: pet,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch pet",
      error: error.message,
    });
  }
};
