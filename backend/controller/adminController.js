const Pet = require("../model/petmodel");

const fetchPets = async (req, res) => {
  try {
    const id = req.body.id;
    let pet = await Pet.find({ owner: id });
    // console.log(pet);
    if (pet) {
      return res.status(200).json({
        success: true,
        data: pet,
      });
    }
    res.status(404).json({ error: "no related pet found", success: false });
  } catch (err) {
    // Handle any errors that occur during the process
    // console.error(err);
    res.status(500).json({ error: "Server error. Could not add pet." });
  }
};
module.exports = { fetchPets };
