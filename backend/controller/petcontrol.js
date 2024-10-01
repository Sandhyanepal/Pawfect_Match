const Pet = require("../model/petmodel");

const getAllPets = async (req, res) => {
  try {
    const pets = await Pet.find();
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

module.exports = {
  getAllPets,
};
